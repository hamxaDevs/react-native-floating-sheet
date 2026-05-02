import {
    Pressable,
    ScrollView,
    Text,
    StyleSheet,
} from 'react-native'
import { ScreenShell, FeatureCard } from '../components'
import type { SheetScreenComponentProps } from 'react-native-floating-sheet'

function SavedScreen({ route, goTo }: SheetScreenComponentProps) {
    return (
        <ScreenShell
            eyebrow="Collection"
            title={route.title}
            description="Saved items show how normal React Native content fits inside the sheet."
        >
            <ScrollView
                contentContainerStyle={styles.savedList}
                showsVerticalScrollIndicator={false}
            >
                <FeatureCard
                    title="Hidden beach route"
                    description="A quiet coastal walk with three saved viewpoints."
                    accent="#22c55e"
                />

                <FeatureCard
                    title="Design inspiration"
                    description="Cards, tabs, and layouts for your next mobile interface."
                    accent="#f59e0b"
                />

                <FeatureCard
                    title="Weekend checklist"
                    description="A compact list that stays easy to scan inside the sheet."
                    accent="#ec4899"
                />

                <Pressable
                    accessibilityRole="button"
                    onPress={() => goTo('Profile')}
                    style={styles.secondaryButton}
                >
                    <Text style={styles.secondaryButtonText}>Open profile</Text>
                </Pressable>
            </ScrollView>
        </ScreenShell>
    )
}

export default SavedScreen


const styles = StyleSheet.create({
    savedList: {
        gap: 10,
        paddingBottom: 20,
    },
    secondaryButton: {
        alignSelf: 'flex-start',
        backgroundColor: '#e2e8f0',
        borderRadius: 999,
        marginTop: 8,
        paddingHorizontal: 16,
        paddingVertical: 11,
    },
    secondaryButtonText: {
        color: '#0f172a',
        fontSize: 14,
        fontWeight: '900',
    },
})
