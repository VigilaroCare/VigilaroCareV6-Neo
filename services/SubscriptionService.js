/**
 * SubscriptionService.js
 * Gerenciamento de Assinaturas com RevenueCat
 * Vigilaro Care V6 Neo
 *
 * TIERS:
 * - free: Recursos básicos
 * - premium: Voz tempo real, scanner ilimitado
 * - familia: Tudo premium + compartilhamento familiar
 *
 * Regra 4: Nenhum preço hardcoded.
 * Regra 5: Nenhum dado pessoal hardcoded.
 */

import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import NetInfo from '@react-native-community/netinfo';
import { Config } from '../utils/Config';
import Purchases from 'react-native-purchases';

const ENTITLEMENTS = {
  PREMIUM: 'premium',
  FAMILIA: 'familia',
};

const PACKAGE_IDENTIFIERS = {
  PREMIUM: ['$rc_monthly', '$rc_annual', 'premium'],
  FAMILIA: ['familia'],
};

const CACHE_KEY = 'subscription_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

const SecureCache = {
  async get(key) {
    try {
      const value = await SecureStore.getItemAsync(key);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  },
  async set(key, value) {
    try {
      await SecureStore.setItemAsync(key, JSON.stringify(value));
    } catch (e) {
      if (__DEV__) {
        console.warn('[SecureCache] set: erro ao salvar:', e?.message);
      }
    }
  },
  async remove(key) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch {
      // ignora erro ao remover
    }
  },
};

class SubscriptionService {
  constructor() {
    this.isConfigured = false;
    this.customerInfo = null;
    this.offerings = null;
    this.listeners = [];
    this._customerInfoListener = null;
  }

  // ---------------------------------------------------------------------------
  // INICIALIZAÇÃO
  // ---------------------------------------------------------------------------

  async initialize(userId = null) {
    // Guarda de idempotência — evita duplo registro de listeners
    if (this.isConfigured) {
      if (__DEV__) {
        console.warn('[SubscriptionService] initialize: já configurado, ignorando chamada duplicada.');
      }
      return;
    }

    try {
      const apiKey = Platform.OS === 'ios'
        ? Config.REVENUECAT_API_KEY_IOS
        : Config.REVENUECAT_API_KEY_ANDROID;

      if (!apiKey) {
        if (__DEV__) {
          console.warn('[SubscriptionService] initialize: chave RevenueCat não configurada. Usando modo gratuito.');
        }
        return;
      }

      await Purchases.configure({ apiKey });

      if (userId) {
        await Purchases.logIn(userId);
      }

      this._customerInfoListener = (info) => {
        this.customerInfo = info;
        this._updateCache(info).catch(() => {});
        this._notifyListeners();
      };

      Purchases.addCustomerInfoUpdateListener(this._customerInfoListener);
      this.isConfigured = true;

      if (__DEV__) {
        console.log('[SubscriptionService] ✅ RevenueCat configurado.');
      }

      await this.refreshCustomerInfo();
      await this.loadOfferings();

    } catch (error) {
      if (__DEV__) {
        console.warn('[SubscriptionService] initialize: erro:', error?.message);
      }
      this.isConfigured = false;
    }
  }

  // ---------------------------------------------------------------------------
  // LISTENERS
  // ---------------------------------------------------------------------------

  addListener(callback) {
    if (typeof callback !== 'function') {
      if (__DEV__) { console.error('[SubscriptionService] addListener: callback deve ser uma função'); }
      return () => {};
    }
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  _notifyListeners() {
    const status = this.getSubscriptionStatus();
    this.listeners.forEach(callback => {
      try {
        callback(status);
      } catch (error) {
        if (__DEV__) { console.error('[SubscriptionService] Erro em listener:', error?.message); }
      }
    });
  }

  // ---------------------------------------------------------------------------
  // CACHE
  // ---------------------------------------------------------------------------

  async _updateCache(info) {
    const isPremium = this._checkEntitlement(info, ENTITLEMENTS.PREMIUM);
    const isFamilia = this._checkEntitlement(info, ENTITLEMENTS.FAMILIA);

    await SecureCache.set(CACHE_KEY, {
      timestamp: Date.now(),
      info: {
        isPremium,
        isFamilia,
        expirationDate:
          info?.entitlements?.active?.[ENTITLEMENTS.PREMIUM]?.expirationDate || null,
      },
    });
  }

  async _getFromCache() {
    const cached = await SecureCache.get(CACHE_KEY);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.info;
    }
    return null;
  }

  // ---------------------------------------------------------------------------
  // DADOS DO CLIENTE
  // ---------------------------------------------------------------------------

  async refreshCustomerInfo() {
    const network = await NetInfo.fetch();

    if (!network.isConnected) {
      if (__DEV__) {
        console.warn('[SubscriptionService] refreshCustomerInfo: offline, usando cache.');
      }
      return await this._getFromCache();
    }

    if (!this.isConfigured) {
      return { isPremium: false, isFamilia: false };
    }

    try {
      this.customerInfo = await Purchases.getCustomerInfo();
      await this._updateCache(this.customerInfo);
      return this.getSubscriptionStatus();
    } catch (error) {
      if (__DEV__) {
        console.warn('[SubscriptionService] refreshCustomerInfo: erro:', error?.message);
      }
      // Fallback para cache — distingue null (sem cache) de dado real
      const cached = await this._getFromCache();
      if (__DEV__ && !cached) {
        console.warn('[SubscriptionService] refreshCustomerInfo: sem cache disponível como fallback.');
      }
      return cached;
    }
  }

  // ---------------------------------------------------------------------------
  // OFFERINGS
  // ---------------------------------------------------------------------------

  async loadOfferings() {
    if (!this.isConfigured) return null;

    try {
      this.offerings = await Purchases.getOfferings();
      return this.offerings;
    } catch (error) {
      if (__DEV__) {
        console.warn('[SubscriptionService] loadOfferings: erro:', error?.message);
      }
      return null;
    }
  }

  getAvailablePackages() {
    if (!this.offerings?.current) return null;

    const packages = this.offerings.current.availablePackages;

    return {
      premium: packages.filter(
        p =>
          PACKAGE_IDENTIFIERS.PREMIUM.some(id => p.identifier.includes(id)) &&
          !PACKAGE_IDENTIFIERS.FAMILIA.some(id => p.identifier.includes(id))
      ),
      familia: packages.filter(p =>
        PACKAGE_IDENTIFIERS.FAMILIA.some(id => p.identifier.includes(id))
      ),
    };
  }

  // ---------------------------------------------------------------------------
  // STATUS
  // ---------------------------------------------------------------------------

  _checkEntitlement(info, entitlement) {
    return !!(info?.entitlements?.active?.[entitlement]);
  }

  getSubscriptionStatus() {
    if (!this.isConfigured || !this.customerInfo) {
      return {
        tier: 'free',
        isPremium: false,
        isFamilia: false,
        expirationDate: null,
        willRenew: false,
        productIdentifier: null,
      };
    }

    const isPremium = this._checkEntitlement(this.customerInfo, ENTITLEMENTS.PREMIUM);
    const isFamilia = this._checkEntitlement(this.customerInfo, ENTITLEMENTS.FAMILIA);

    const tier = isFamilia ? 'familia' : isPremium ? 'premium' : 'free';

    const activeEntitlement =
      this.customerInfo.entitlements?.active?.[ENTITLEMENTS.FAMILIA] ||
      this.customerInfo.entitlements?.active?.[ENTITLEMENTS.PREMIUM];

    return {
      tier,
      isPremium: isPremium || isFamilia,
      isFamilia,
      expirationDate: activeEntitlement?.expirationDate || null,
      willRenew: activeEntitlement?.willRenew || false,
      productIdentifier: activeEntitlement?.productIdentifier || null,
    };
  }

  async isPremium() {
    const cached = await this._getFromCache();
    if (cached) return cached.isPremium || cached.isFamilia;

    if (!this.isConfigured) return false;

    const status = await this.refreshCustomerInfo();
    return status?.isPremium || status?.isFamilia || false;
  }

  getStatus() {
    return {
      isConfigured: this.isConfigured,
      hasCustomerInfo: !!this.customerInfo,
      hasOfferings: !!this.offerings,
      activeListeners: this.listeners.length,
      subscriptionStatus: this.getSubscriptionStatus(),
    };
  }

  // ---------------------------------------------------------------------------
  // COMPRAS
  // ---------------------------------------------------------------------------

  async purchasePackage(packageToPurchase) {
    if (!this.isConfigured) {
      return { success: false, error: 'RevenueCat não configurado' };
    }

    try {
      const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
      this.customerInfo = customerInfo;
      await this._updateCache(customerInfo); // cache atualizado imediatamente
      this._notifyListeners();
      return { success: true, status: this.getSubscriptionStatus() };
    } catch (error) {
      if (error.userCancelled) {
        return { success: false, cancelled: true };
      }
      if (__DEV__) {
        console.warn('[SubscriptionService] purchasePackage: erro:', error?.message);
      }
      return { success: false, error: error?.message };
    }
  }

  async restorePurchases() {
    if (!this.isConfigured) {
      return { success: false, message: 'RevenueCat não configurado' };
    }

    try {
      const customerInfo = await Purchases.restorePurchases();
      this.customerInfo = customerInfo;
      await this._updateCache(customerInfo); // cache atualizado imediatamente
      this._notifyListeners();
      const status = this.getSubscriptionStatus();
      return { success: true, restored: status.isPremium, status };
    } catch (error) {
      if (__DEV__) {
        console.warn('[SubscriptionService] restorePurchases: erro:', error?.message);
      }
      return { success: false, error: error?.message };
    }
  }

  // ---------------------------------------------------------------------------
  // LOGOUT
  // ---------------------------------------------------------------------------

  async logout() {
    if (this._customerInfoListener) {
      try {
        Purchases.removeCustomerInfoUpdateListener(this._customerInfoListener);
      } catch {
        // ignora
      }
      this._customerInfoListener = null;
    }

    if (this.isConfigured) {
      try {
        await Purchases.logOut();
      } catch (error) {
        if (__DEV__) {
          console.warn('[SubscriptionService] logout: erro no logOut RevenueCat:', error?.message);
        }
      }
    }

    this.customerInfo = null;
    this.offerings = null;
    this.listeners = [];
    this.isConfigured = false; // permite reinicialização limpa após novo login
    await SecureCache.remove(CACHE_KEY);

    if (__DEV__) {
      console.log('[SubscriptionService] 🚪 Logout concluído.');
    }
  }

  // ---------------------------------------------------------------------------
  // DEBUG
  // ---------------------------------------------------------------------------

  async debugSetPremium(value = true) {
    if (!__DEV__) return;

    console.log(`[SubscriptionService] 🧪 debugSetPremium: ${value ? 'ATIVADO' : 'DESATIVADO'}`);
    await SecureCache.set(CACHE_KEY, {
      timestamp: Date.now(),
      info: { isPremium: value, isFamilia: false, expirationDate: null },
    });
    this._notifyListeners();
  }
}

export default new SubscriptionService();