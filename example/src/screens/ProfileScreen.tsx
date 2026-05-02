import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { ArrowIcon } from '../assets'
import { ScreenShell, StatCard } from '../components'
import type { SheetScreenComponentProps } from 'react-native-floating-sheet'

function ProfileScreen({ route, goTo }: SheetScreenComponentProps) {
    return (
        <ScreenShell
            eyebrow="Account"
            title={route.title}
            description="Use screen props like route and goTo to build connected sheet experiences."
        >
            <View style={styles.profileCard}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>FS</Text>
                </View>

                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>Floating Sheet</Text>
                    <Text style={styles.profileMeta}>Example workspace</Text>
                </View>
            </View>

            <View style={styles.statsRow}>
                <StatCard label="Screens" value="3" />
                <StatCard label="Tabs" value="3" />
                <StatCard label="Mode" value="Light" />
            </View>

            <Pressable
                accessibilityRole="button"
                onPress={() => goTo('Explore')}
                style={styles.primaryButton}
            >
                <Text style={styles.primaryButtonText}>Back to Explore</Text>
                <ArrowIcon color="#ffffff" size={17} />
            </Pressable>
        </ScreenShell>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
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
    profileCard: {
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderColor: 'rgba(15, 23, 42, 0.08)',
        borderRadius: 26,
        borderWidth: 1,
        flexDirection: 'row',
        marginBottom: 12,
        padding: 16,
    },
    avatar: {
        alignItems: 'center',
        backgroundColor: '#2563eb',
        borderRadius: 999,
        height: 56,
        justifyContent: 'center',
        marginRight: 14,
        width: 56,
    },
    avatarText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '900',
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        color: '#0f172a',
        fontSize: 17,
        fontWeight: '900',
        marginBottom: 3,
    },
    profileMeta: {
        color: '#64748b',
        fontSize: 13,
        fontWeight: '700',
    },
    statsRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 12,
    },
})
