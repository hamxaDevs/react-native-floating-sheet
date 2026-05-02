import { Pressable, Text, View, StyleSheet } from 'react-native'
import { ArrowIcon } from '../assets'
import { ScreenShell } from '../components'
import type { SheetScreenComponentProps } from 'react-native-floating-sheet'

function ExploreScreen({ route, goTo }: SheetScreenComponentProps) {
    return (
        <ScreenShell
            eyebrow="Discover"
            title={route.title}
            description="Explore curated places, collections, and ideas inside a floating sheet."
        >
            <View style={styles.heroCard}>
                <View style={styles.heroCardTop}>
                    <View>
                        <Text style={styles.heroCardLabel}>Featured today</Text>
                        <Text style={styles.heroCardTitle}>Mountain escape</Text>
                    </View>

                    <View style={styles.heroBadge}>
                        <Text style={styles.heroBadgeText}>New</Text>
                    </View>
                </View>

                <Text style={styles.heroCardText}>
                    A calm weekend guide with scenic routes, saved stops, and lightweight
                    planning tips.
                </Text>

                <Pressable
                    accessibilityRole="button"
                    onPress={() => goTo('Saved')}
                    style={styles.primaryButton}
                >
                    <Text style={styles.primaryButtonText}>View saved picks</Text>
                    <ArrowIcon color="#ffffff" size={17} />
                </Pressable>
            </View>
        </ScreenShell>
    )
}

export default ExploreScreen

const styles = StyleSheet.create({
    heroCard: {
        backgroundColor: '#0f172a',
        borderRadius: 28,
        marginBottom: 14,
        padding: 18,
    },
    heroCardTop: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    heroCardLabel: {
        color: '#94a3b8',
        fontSize: 12,
        fontWeight: '800',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    heroCardTitle: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: '900',
    },
    heroBadge: {
        backgroundColor: '#38bdf8',
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    heroBadgeText: {
        color: '#0f172a',
        fontSize: 11,
        fontWeight: '900',
    },
    heroCardText: {
        color: '#cbd5e1',
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 16,
    },
    featureGrid: {
        gap: 10,
        marginTop: 15,
    },

    savedList: {
        gap: 10,
        paddingBottom: 20,
    },
    primaryButton: {
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: '#2563eb',
        borderRadius: 999,
        flexDirection: 'row',
        gap: 8,
        marginTop: 8,
        paddingHorizontal: 16,
        paddingVertical: 11,
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '900',
    },
})
