import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NeoIcon from '../components/NeoIcon';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import { useFocusEffect } from '@react-navigation/native';

// Screens
import HomeScreen from '../screens/HomeScreenNeo';
import KnowledgeHubScreen from '../screens/Education/KnowledgeHubScreen';
import MenuScreen from '../screens/MenuScreenNeo';
import AccessibilitySettingsScreen from '../screens/AccessibilitySettingsScreen';
import TravelModeScreen from '../screens/Travel/TravelModeScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
    const insets = useSafeAreaInsets();
    const TAB_HEIGHT = 65 + (insets.bottom > 0 ? insets.bottom : 10);

    useFocusEffect(
        React.useCallback(() => {
            if (Platform.OS === 'android') {
                // [FIX-M02] Evita falha no Android 15+ (edge-to-edge obrigatório)
                (async () => {
                    try {
                        const apiLevel = Platform.Version;
                        if (typeof apiLevel === 'number' && apiLevel < 35) {
                            await NavigationBar.setBackgroundColorAsync("#F2F8F4");
                            await NavigationBar.setButtonStyleAsync("dark");
                        }
                    } catch (_) {
                        // edge-to-edge ativo ou não suportado — ignorar
                    }
                })();
            }
        }, [])
    );

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                lazy: true,
                tabBarHideOnKeyboard: true,
                tabBarStyle: { display: 'none' },
                tabBarActiveTintColor: Neo.colors.primary[500],
                tabBarInactiveTintColor: Neo.colors.neutral[500],
                tabBarLabelStyle: {
                    fontFamily: 'System',
                    fontSize: 10,
                    fontWeight: '500',
                    marginTop: -4
                }
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <NeoIcon name="Home2" variant={focused ? "Bold" : "Linear"} size={28} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="KnowledgeTab"
                component={KnowledgeHubScreen}
                options={{
                    tabBarLabel: 'Aprender',
                    tabBarIcon: ({ color, focused }) => (
                        <NeoIcon name="Book" variant={focused ? "Bold" : "Linear"} size={24} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="AcessibilidadeTab"
                component={AccessibilitySettingsScreen}
                options={{
                    tabBarLabel: 'Acessibilidade',
                    tabBarIcon: ({ color, focused }) => (
                        <NeoIcon name="Health" variant={focused ? "Bold" : "Linear"} size={24} color={color} />
                    ),
                }}
            />

            {/* 2026-07-31: era RelatorioTab -> ProfileRiskSummaryScreen. O
                relatório passou a ser um card ao lado do Mapa de Calor, em
                Vistorias; ProfileRiskSummary continua no stack e é alcançado
                por lá e pelo painel de perfil em Quem e Onde Proteger. */}
            <Tab.Screen
                name="TravelModeTab"
                component={TravelModeScreen}
                options={{
                    tabBarLabel: 'Viagem',
                    tabBarIcon: ({ color, focused }) => (
                        <NeoIcon name="Airplane" variant={focused ? "Bold" : "Linear"} size={28} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="MenuTab"
                component={MenuScreen}
                options={{
                    tabBarLabel: 'Menu',
                    tabBarIcon: ({ color, focused }) => (
                        <NeoIcon name="Setting2" variant={focused ? "Bold" : "Linear"} size={28} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
