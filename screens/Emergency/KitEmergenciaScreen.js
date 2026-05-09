import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../../utils/Theme';
import { EMERGENCY_ITEMS } from '../../data/kits/emergency';
import KitService from '../../services/KitService';
import ProfileService from '../../services/ProfileService';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';

export default function KitEmergenciaScreen({ navigation }) {
    const { t } = useTranslation('common');
  const [checkedItems, setCheckedItems] = useState([]);
  const [residenceId, setResidenceId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const id = await ProfileService.getActiveResidenceId();
      setResidenceId(id);
      const state = await KitService.loadKitState('emergencia', id);
      setCheckedItems(state || []);
    } catch (error) {
      console.error('Error loading kit state:', error);
    }
  };

  const toggleItem = async (id) => {
    let newItems;
    if (checkedItems.includes(id)) {
      newItems = checkedItems.filter(item => item !== id);
    } else {
      newItems = [...checkedItems, id];
    }
    setCheckedItems(newItems);

    if (residenceId) {
      await KitService.saveKitState('emergencia', residenceId, newItems);
    }
  };

  const progress = checkedItems.length / EMERGENCY_ITEMS.length;

  return (
    <View style={[styles.container, { paddingTop: 0 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <NeoIcon name="ArrowLeft2" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}></Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* HERO CARD STANDARD */}
        <View style={styles.heroCard}>
          <View style={styles.heroIconCircle}>
            <NeoIcon name="Briefcase" size={40} color="#FFF" />
          </View>
          <Text style={styles.heroTitle}>{t('headersFirst.kitParaEmergNcias', 'Kit para Emergências')}</Text>
          <Text style={styles.heroSubtitle}>
            {t('headersFirst.vitalParaSobrevivNciaEmCatStrofesNaturai', 'Vital para sobrevivência em catástrofes naturais como enchentes, deslizamentos e desmoronamentos, além de incêndios. Deve garantir autonomia e segurança por 72 horas.')}
          </Text>

          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>{Math.round(progress * 100)}% completo</Text>
        </View>

        <Text style={styles.sectionTitle}>{t('headersFirst.checklistDoKit', 'Checklist do Kit')}</Text>

        {EMERGENCY_ITEMS.map((item) => {
          const isChecked = checkedItems.includes(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.itemCard, isChecked && styles.itemCardChecked]}
              onPress={() => toggleItem(item.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.itemIcon, isChecked ? styles.itemIconChecked : styles.itemIconUnchecked]}>
                <NeoIcon name={isChecked ? "checkmark" : (item.icon || "radio-button-off")} size={20} color={isChecked ? "#FFF" : "#666"} />
              </View>
              <View style={styles.itemInfo}>
                <Text style={[styles.itemName, isChecked && styles.itemNameChecked]}>{item.text}</Text>
                <Text style={styles.itemDesc}>{item.category}</Text>
              </View>
              <View style={styles.checkbox}>
                {isChecked && <NeoIcon name="TickSquare" size={16} color="#FFF" />}
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={[styles.tipBox, { borderColor: '#7B1FA2', borderLeftColor: '#7B1FA2', backgroundColor: '#F3E5F5' }]}>
          <NeoIcon name="InfoCircle" size={24} color="#7B1FA2" />
          <Text style={[styles.tipText, { color: '#4A148C' }]}>
            {t('headersFirst.verifiqueAValidadeDosAlimentosEGuaACada6', 'Verifique a validade dos alimentos e água a cada 6 meses.')}
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(229, 229, 234, 0.6)',
  },
  backBtn: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  content: {
    padding: 20,
    paddingBottom: 120,
    paddingBottom: 120,
  },
  heroCard: {
    backgroundColor: '#9C27B0', // Purple for Emergency
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    ...Shadows.md,
  },
  heroIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'transparent',
    borderRadius: 4,
  },
  progressText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  itemCardChecked: {
    backgroundColor: '#F3E5F5',
    borderColor: '#9C27B0',
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  itemIconUnchecked: {
    backgroundColor: 'transparent',
  },
  itemIconChecked: {
    backgroundColor: '#9C27B0',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  itemNameChecked: {
    color: '#7B1FA2',
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  itemDesc: {
    fontSize: 12,
    color: '#888',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  tipBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  tipText: {
    flex: 1,
    marginLeft: 12,
    color: '#D97706',
    fontSize: 14,
  },
});
