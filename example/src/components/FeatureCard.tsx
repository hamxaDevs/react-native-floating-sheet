import { StyleSheet, Text, View } from 'react-native';

type FeatureCardProps = {
    title: string;
    description: string;
    accent: string;
}

function FeatureCard({
    title,
    description,
    accent,
}: FeatureCardProps) {
    return (
        <View style={styles.featureCard}>
            <View style={[styles.featureAccent, { backgroundColor: accent }]} />
            <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{title}</Text>
                <Text style={styles.featureDescription}>{description}</Text>
            </View>
        </View>
    );
}

export default FeatureCard

const styles = StyleSheet.create({
    featureCard: {
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderColor: 'rgba(15, 23, 42, 0.08)',
        borderRadius: 22,
        borderWidth: 1,
        flexDirection: 'row',
        padding: 14,
    },
    featureAccent: {
        borderRadius: 999,
        height: 38,
        marginRight: 12,
        width: 6,
    },
    featureContent: {
        flex: 1,
    },
    featureTitle: {
        color: '#0f172a',
        fontSize: 15,
        fontWeight: '900',
        marginBottom: 4,
    },
    featureDescription: {
        color: '#64748b',
        fontSize: 13,
        lineHeight: 18,
    },

});
