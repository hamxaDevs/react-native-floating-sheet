import { StyleSheet, Text, View } from 'react-native';

function StatCard({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <View style={styles.statCard}>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );
}

export default StatCard

const styles = StyleSheet.create({
    statCard: {
        backgroundColor: '#f8fafc',
        borderColor: 'rgba(15, 23, 42, 0.08)',
        borderRadius: 22,
        borderWidth: 1,
        flex: 1,
        padding: 14,
    },
    statValue: {
        color: '#0f172a',
        fontSize: 18,
        fontWeight: '900',
        marginBottom: 3,
    },
    statLabel: {
        color: '#64748b',
        fontSize: 12,
        fontWeight: '800',
    },
});
