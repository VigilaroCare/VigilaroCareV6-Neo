/**
 * MicroBlogScreen.js
 * Lista categorizada de micro artigos do Prevenir em Casa
 */
import React, { useState, useMemo } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    Image, StatusBar, FlatList
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import { ArrowLeft } from 'iconsax-react-native';
import AppBackground from '../../components/AppBackground';
import { MICRO_BLOG_ARTICLES, MICRO_BLOG_CATEGORIES } from '../../data/micro_blog';
import { t_field } from '../../utils/getLocalizedField';

export default function MicroBlogScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredArticles = useMemo(() => {
        if (activeCategory === 'all') return MICRO_BLOG_ARTICLES;
        return MICRO_BLOG_ARTICLES.filter(a => a.category === activeCategory);
    }, [activeCategory]);

    const getCategoryLabel = (catId) => {
        const cat = MICRO_BLOG_CATEGORIES.find(c => c.id === catId);
        return cat ? t_field(cat, 'label') : catId;
    };

    const getCategoryColor = (catId) => {
        const cat = MICRO_BLOG_CATEGORIES.find(c => c.id === catId);
        return cat ? cat.color : '#666';
    };

    const renderArticleCard = (article) => (

        <TouchableOpacity
            key={article.id}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('MicroArticle', { articleId: article.id })}
            style={{ marginBottom: 8 }}
        >
            <NeoCard variant="elevated" style={styles.articleCard}>
                <Image
                    source={{ uri: article.thumbnail }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                />
                <View style={styles.articleContent}>
                    <View style={styles.articleMeta}>
                        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(article.category) + '20' }]}>
                            <Text style={[styles.categoryBadgeText, { color: getCategoryColor(article.category) }]}>
                                {getCategoryLabel(article.category)}
                            </Text>
                        </View>
                        <Text style={styles.readTime}>⏱️ {article.readTime} min</Text>
                    </View>
                    <Text style={styles.articleTitle} numberOfLines={2}>{t_field(article, 'title')}</Text>
                    <Text style={styles.articlePreview} numberOfLines={2}>
                        {t_field(article, 'summary').substring(0, 100)}...
                    </Text>
                </View>
            </NeoCard>
        </TouchableOpacity>
    );

    return (
        <AppBackground variant="subtle">
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />

                {/* Header */}
                <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowLeft size={24} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.headerTitle}>📰 Micro Blog</Text>
                        <Text style={styles.headerSubtitle}>Prevenir em Casa</Text>
                    </View>
                    <View style={{ width: 40 }} />
                </View>

                {/* Category Filter Chips */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.chipsContainer}
                >
                    <TouchableOpacity
                        onPress={() => setActiveCategory('all')}
                        style={[styles.chip, activeCategory === 'all' && styles.chipActive]}
                    >
                        <Text style={[styles.chipText, activeCategory === 'all' && styles.chipTextActive]}>
                            Todos ({MICRO_BLOG_ARTICLES.length})
                        </Text>
                    </TouchableOpacity>
                    {MICRO_BLOG_CATEGORIES.map(cat => {
                        const count = MICRO_BLOG_ARTICLES.filter(a => a.category === cat.id).length;
                        if (count === 0) return null;
                        return (
                            <TouchableOpacity
                                key={cat.id}
                                onPress={() => setActiveCategory(cat.id)}
                                style={[
                                    styles.chip,
                                    activeCategory === cat.id && { backgroundColor: cat.color, borderColor: cat.color }
                                ]}
                            >
                                <Text style={[
                                    styles.chipText,
                                    activeCategory === cat.id && styles.chipTextActive
                                ]}>
                                    {t_field(cat, 'label')} ({count})
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* Articles List */}
                <ScrollView
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {filteredArticles.map(renderArticleCard)}
                    <View style={{ height: 100 }} />
                </ScrollView>
            </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 12,
        backgroundColor: 'transparent',
    },
    backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: Neo.colors.neutral[900] },
    headerSubtitle: { fontSize: 12, color: Neo.colors.neutral[500], marginTop: 2 },
    chipsContainer: { paddingHorizontal: 16, paddingBottom: 16, paddingTop: 6, alignItems: 'center' },
    chip: {
        paddingHorizontal: 16,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderTopColor: 'rgba(255, 255, 255, 0.9)', // Light Catcher para o chip
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chipActive: { backgroundColor: Neo.colors.primary[600], borderColor: Neo.colors.primary[600] },
    chipText: { fontSize: 13, fontWeight: '600', color: Neo.colors.neutral[600], lineHeight: 18, marginTop: -2 },
    chipTextActive: { color: '#FFF' },
    listContainer: { paddingHorizontal: 16 },
    articleCard: {
        flexDirection: 'row',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Neo.colors.neutral[200],
        padding: 0, // Remover padding do NeoCard para a imagem encostar na borda
    },
    thumbnail: { width: 100, height: 110 },
    articleContent: { flex: 1, padding: 12, justifyContent: 'center' },
    articleMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
    categoryBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
    categoryBadgeText: { fontSize: 10, fontWeight: 'bold' },
    readTime: { fontSize: 10, color: Neo.colors.neutral[400] },
    articleTitle: { fontSize: 13, fontWeight: 'bold', color: Neo.colors.neutral[800], marginBottom: 4, lineHeight: 17 },
    articlePreview: { fontSize: 11, color: Neo.colors.neutral[500], lineHeight: 15 },
});
