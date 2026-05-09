/**
 * MicroArticleScreen.js
 * Tela de leitura de micro artigo individual
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    Image, StatusBar, Linking, Share, Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import { ArrowLeft } from 'iconsax-react-native';
import { MICRO_BLOG_CATEGORIES, MICRO_BLOG_ARTICLES } from '../../data/micro_blog';
import { t_field } from '../../utils/getLocalizedField';

export default function MicroArticleScreen({ navigation, route }) {
    const { t } = useTranslation('common');
    const insets = useSafeAreaInsets();

    // Suporta tanto article completo quanto apenas articleId
    const article = route.params?.article || MICRO_BLOG_ARTICLES.find(a => a.id === route.params?.articleId);

    if (!article) {
        navigation.goBack();
        return null;
    }

    const category = MICRO_BLOG_CATEGORIES.find(c => c.id === article.category);

    const handleReadFull = () => {
        Linking.openURL(article.fullUrl);
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `📰 ${t_field(article, 'title')}\n\n${t_field(article, 'summary')}\n\n🔗 Leia o artigo completo: ${article.fullUrl}\n\n— Vigilaro Care | Prevenir em Casa`,
                title: t_field(article, 'title'),
            });
        } catch (e) { console.error(e); }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Hero Image */}
            <View style={{ position: 'relative' }}>
                <Image
                    source={{ uri: article.thumbnail }}
                    style={styles.heroImage}
                    resizeMode="cover"
                />
                <View style={styles.heroOverlay} />

                {/* Back Button */}
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.backBtn, { top: insets.top + 8 }]}
                >
                    <ArrowLeft size={24} color="#FFF" />
                </TouchableOpacity>

                {/* Share Button */}
                <TouchableOpacity
                    onPress={handleShare}
                    style={[styles.shareBtn, { top: insets.top + 8 }]}
                >
                    <NeoIcon name="ShareNetwork" size={22} color="#FFF" />
                </TouchableOpacity>

                {/* Category Badge on Image */}
                <View style={[styles.heroBadge, { backgroundColor: category?.color || '#666' }]}>
                    <Text style={styles.heroBadgeText}>{category ? t_field(category, 'label') : article.category}</Text>
                </View>
            </View>

            <AppBackground variant="subtle" statusBarStyle="light-content">
                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Title */}
                    <Text style={styles.title}>{t_field(article, 'title')}</Text>

                    {/* Meta */}
                    <View style={styles.metaRow}>
                        <Text style={styles.metaText}>⏱️ {article.readTime} min de leitura</Text>
                        <Text style={styles.metaText}>{t('headersFirst.PrevenirEmCasa', '📰 Prevenir em Casa')}</Text>
                    </View>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Article Body */}
                    <Text style={styles.body}>{t_field(article, 'summary')}</Text>

                    {/* CTA: Read Full */}
                    <TouchableOpacity onPress={handleReadFull} style={styles.readFullBtn}>
                        <NeoIcon name="ExportSquare" size={20} color="#FFF" />
                        <Text style={styles.readFullText}>{t('headersFirst.lerArtigoCompleto', 'Ler artigo completo')}</Text>
                    </TouchableOpacity>

                    {/* Share */}
                    <TouchableOpacity onPress={handleShare} style={styles.shareRow}>
                        <NeoIcon name="ShareNetwork" size={18} color={Neo.colors.primary[600]} />
                        <Text style={styles.shareText}>{t('headersFirst.compartilharEsteArtigo', 'Compartilhar este artigo')}</Text>
                    </TouchableOpacity>

                    <View style={{ height: 100 }} />
                </ScrollView>
            </AppBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },
    heroImage: { width: '100%', height: 220 },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    backBtn: {
        position: 'absolute', left: 16,
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center', justifyContent: 'center',
    },
    shareBtn: {
        position: 'absolute', right: 16,
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center', justifyContent: 'center',
    },
    heroBadge: {
        position: 'absolute', bottom: 16, left: 16,
        paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12,
    },
    heroBadgeText: { color: '#FFF', fontSize: 11, fontWeight: 'bold' },
    content: { padding: 20 },
    title: {
        fontSize: 22, fontWeight: 'bold',
        color: Neo.colors.neutral[900], lineHeight: 28, marginBottom: 12,
    },
    metaRow: {
        flexDirection: 'row', gap: 16, marginBottom: 16,
    },
    metaText: { fontSize: 12, color: Neo.colors.neutral[400] },
    divider: {
        height: 1, backgroundColor: Neo.colors.neutral[200], marginBottom: 20,
    },
    body: {
        fontSize: 15, lineHeight: 24, color: Neo.colors.neutral[700],
        marginBottom: 24,
    },
    readFullBtn: {
        backgroundColor: Neo.colors.primary[600],
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        padding: 16, borderRadius: 14, gap: 10, marginBottom: 12,
    },
    readFullText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
    shareRow: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        padding: 14, gap: 8,
    },
    shareText: { color: Neo.colors.primary[600], fontWeight: '600', fontSize: 14 },
});
