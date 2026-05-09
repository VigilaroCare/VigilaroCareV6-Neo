import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home2, Book, Health, Airplane, Setting2 } from 'iconsax-react-native';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import { useFocusEffect } from '@react-navigation/native';

// Screens
import HomeScreen from '../screens/HomeScreenNeo';
import KnowledgeHubScreen from '../screens/Education/KnowledgeHubScreen';
import RelatoriosScreen from '../screens/Checklists/RelatoriosScreenNeo';
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
                        <Home2 variant={focused ? "Bold" : "Outline"} size={28} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="KnowledgeTab"
                component={KnowledgeHubScreen}
                options={{
                    tabBarLabel: 'Aprender',
                    tabBarIcon: ({ color, focused }) => (
                        <Book variant={focused ? "Bold" : "Outline"} size={24} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="AcessibilidadeTab"
                component={AccessibilitySettingsScreen}
                options={{
                    tabBarLabel: 'Acessibilidade',
                    tabBarIcon: ({ color, focused }) => (
                        <Health variant={focused ? "Bold" : "Outline"} size={24} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="TravelModeTab"
                component={TravelModeScreen}
                options={{
                    tabBarLabel: 'Viagem',
                    tabBarIcon: ({ color, focused }) => (
                        <Airplane variant={focused ? "Bold" : "Outline"} size={28} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="MenuTab"
                component={MenuScreen}
                options={{
                    tabBarLabel: 'Menu',
                    tabBarIcon: ({ color, focused }) => (
                        <Setting2 variant={focused ? "Bold" : "Outline"} size={28} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
