import React from 'react';
import { View, TouchableOpacity, LayoutAnimation } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoCard from './NeoCard';
import NeoIcon from './NeoIcon';
import { H3, Body, Small } from './NeoTypography';

export default function TravelChecklistCard({ 
    section, 
    isExpanded, 
    onToggleSection, 
    checkedItems, 
    onToggleItem 
}) {
    const { t } = useTranslation('common');
    const completedCount = section.items.filter(item => checkedItems[item.id]).length;
    const totalCount = section.items.length;
    const isCompleted = completedCount === totalCount;

    const toggleSectionWithAnimation = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        onToggleSection();
    };

    const toggleItemWithAnimation = (itemId) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        onToggleItem(itemId);
    };

    return (
        <NeoCard variant="elevated" style={{ marginBottom: 16, overflow: 'hidden' }}>
            <TouchableOpacity
                onPress={toggleSectionWithAnimation}
                activeOpacity={0.8}
                style={{
                    flexDirection: 'row', alignItems: 'center', padding: 16,
                    backgroundColor: isCompleted ? Neo.colors.feedback.success + '1A' : 'transparent'
                }}
            >
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: section.color + '15', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                    <NeoIcon name={section.icon} size={20} color={isCompleted ? Neo.colors.feedback.success : section.color} variant="Bold" />
                </View>
                <View style={{ flex: 1 }}>
                    <H3 style={{ color: isCompleted ? Neo.colors.feedback.success : Neo.colors.neutral[800], fontSize: 15 }}>{section.title}</H3>
                    <Small style={{ color: Neo.colors.neutral[500], fontSize: 11, marginTop: 2 }}>{completedCount} {t('travel.completedOf')} {totalCount} {t('travel.completed')}</Small>
                </View>
                {isExpanded ? <NeoIcon name="ArrowUp2" size={20} color={isCompleted ? Neo.colors.feedback.success : section.color} /> : <NeoIcon name="ArrowDown2" size={20} color={isCompleted ? Neo.colors.feedback.success : section.color} />}
            </TouchableOpacity>

            {isExpanded && (
                <View style={{ padding: 16, paddingTop: 0 }}>
                    <View style={{ height: 1, backgroundColor: Neo.colors.neutral[100], marginBottom: 12 }} />
                    {section.items.map(item => {
                        const isChecked = checkedItems[item.id];
                        return (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => toggleItemWithAnimation(item.id)}
                                style={{
                                    flexDirection: 'row', alignItems: 'center', paddingVertical: 12,
                                    borderBottomWidth: 1, borderBottomColor: Neo.colors.neutral[50],
                                    opacity: isChecked ? 0.6 : 1
                                }}
                            >
                                <View style={{
                                    width: 24, height: 24, borderRadius: 12,
                                    borderWidth: 2, borderColor: isChecked ? Neo.colors.feedback.success : Neo.colors.neutral[300],
                                    backgroundColor: isChecked ? Neo.colors.feedback.success : 'transparent',
                                    alignItems: 'center', justifyContent: 'center', marginRight: 12
                                }}>
                                    {isChecked && <NeoIcon name="TickCircle" size={14} color={Neo.colors.neutral.white} variant="Bold" />}
                                </View>
                                <Body style={{ flex: 1, color: isChecked ? Neo.colors.neutral[500] : Neo.colors.neutral[800], textDecorationLine: isChecked ? 'line-through' : 'none', fontSize: 13, lineHeight: 18 }}>
                                    {item.label}
                                </Body>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}
        </NeoCard>
    );
}
