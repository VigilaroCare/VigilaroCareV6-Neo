/**
 * NavigationService.js
 * Serviço centralizado de navegação — a UI é a única responsável por navegar.
 * Serviços e workers não devem importar este módulo diretamente;
 * devem usar callbacks para comunicar intenção de navegação ao componente pai.
 */

import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

// Mapa de timers pendentes por rota — permite cancelar tentativas anteriores
// antes de criar uma nova para a mesma rota.
const _pendingTimers = {};

const MAX_RETRIES = 5;
const RETRY_INTERVAL_MS = 300;

/**
 * Navega para uma rota com retry automático (até MAX_RETRIES tentativas).
 * Tentativas anteriores para a mesma rota são canceladas antes de iniciar.
 */
export function navigate(name, params) {
    // Cancela qualquer tentativa pendente para esta rota
    if (_pendingTimers[name]) {
        clearTimeout(_pendingTimers[name]);
        delete _pendingTimers[name];
    }

    let attempt = 0;

    const tryNavigate = () => {
        try {
            if (navigationRef.isReady()) {
                navigationRef.navigate(name, params);
                delete _pendingTimers[name];
            } else if (attempt < MAX_RETRIES) {
                attempt++;
                _pendingTimers[name] = setTimeout(tryNavigate, RETRY_INTERVAL_MS);
            } else {
                if (__DEV__) {
                    console.warn('[NavigationService] navigate: navigator nao ficou pronto apos ' + MAX_RETRIES + ' tentativas para rota: ' + name);
                }
                delete _pendingTimers[name];
            }
        } catch (error) {
            if (__DEV__) {
                console.warn('[NavigationService] navigate: erro ao navegar para ' + name + ': ' + (error && error.message));
            }
            delete _pendingTimers[name];
        }
    };

    tryNavigate();
}

/**
 * Retorna o nome da rota atual se o navegador estiver pronto, ou null.
 */
export function getCurrentRoute() {
    try {
        if (navigationRef.isReady()) {
            const route = navigationRef.getCurrentRoute();
            return route ? route.name : null;
        }
        return null;
    } catch (error) {
        if (__DEV__) {
            console.warn('[NavigationService] getCurrentRoute: ' + (error && error.message));
        }
        return null;
    }
}

/**
 * Reinicia o historico de navegação posicionando o usuário em uma tela específica.
 * Necessário para fluxos de logout e reset de onboarding.
 * @param {string} routeName - Nome da rota de destino.
 * @param {object} [params] - Parâmetros opcionais da rota.
 */
export function reset(routeName, params) {
    try {
        if (navigationRef.isReady()) {
            navigationRef.reset({
                index: 0,
                routes: [{ name: routeName, params }],
            });
        } else {
            if (__DEV__) {
                console.warn('[NavigationService] reset: navigator nao esta pronto, nao foi possivel resetar para: ' + routeName);
            }
        }
    } catch (error) {
        if (__DEV__) {
            console.warn('[NavigationService] reset: erro ao resetar para ' + routeName + ': ' + (error && error.message));
        }
    }
}

/**
 * Volta para a tela anterior se houver histórico disponível.
 */
export function goBack() {
    try {
        if (navigationRef.isReady() && navigationRef.canGoBack()) {
            navigationRef.goBack();
        }
    } catch (error) {
        if (__DEV__) {
            console.warn('[NavigationService] goBack: ' + (error && error.message));
        }
    }
}

