import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { FeatureCard } from './components'
import { Sheet } from 'react-native-floating-sheet'
import { ExploreIcon, SavedIcon, ProfileIcon } from './assets'
import { ExploreScreen, SavedScreen, ProfileScreen } from './screens'


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.backgroundOrbOne} />
      <View style={styles.backgroundOrbTwo} />

      <View style={styles.hero}>
        <View style={styles.kickerRow}>
          <View style={styles.kickerDot} />
          <Text style={styles.kicker}>React Native Floating Sheet</Text>
        </View>

        <Text style={styles.heading}>A floating sheet navigator for apps</Text>

        <Text style={styles.subheading}>
          Create a detached bottom tab bar that expands into beautiful,
          screen-based sheet content.
        </Text>

        <View style={styles.featureGrid}>
          <FeatureCard
            title="Smart tabs"
            description="Switch between screens while keeping the sheet visible."
            accent="#38bdf8"
          />

          <FeatureCard
            title="Smooth gestures"
            description="Drag upward to expand and downward to collapse."
            accent="#a78bfa"
          />
        </View>

        <View style={styles.previewPanel}>
          <View style={styles.previewPanelHeader}>
            <View style={styles.previewDot} />
            <View style={[styles.previewDot, styles.previewDotMuted]} />
            <View style={[styles.previewDot, styles.previewDotMuted]} />
          </View>

          <View style={styles.previewLineLarge} />
          <View style={styles.previewLine} />
          <View style={styles.previewLineShort} />
        </View>
      </View>

      <Sheet.Navigator
        initialRouteName="Explore"
        collapsedHeight={88}
        expandedHeight={520}
        onRouteChange={(routeName) => {
          console.log('Active sheet route:', routeName)
        }}
        screenOptions={{
          activeTintColor: '#ffffff',
          inactiveTintColor: '#64748b',
          sheetBackgroundColor: '#ffffff',
          tabBarBackgroundColor: '#f8fafc',
          handleColor: '#cbd5e1',
          showTabDot: false,
        }}
      >
        <Sheet.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            title: 'Explore',
            renderIcon: ({ color, size }) => (
              <ExploreIcon color={color} size={size} />
            ),
          }}
        />

        <Sheet.Screen
          name="Saved"
          component={SavedScreen}
          options={{
            title: 'Saved',
            renderIcon: ({ color, size }) => (
              <SavedIcon color={color} size={size} />
            ),
          }}
        />

        <Sheet.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
            renderIcon: ({ color, size }) => (
              <ProfileIcon color={color} size={size} />
            ),
          }}
        />
      </Sheet.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eef2f7',
    flex: 1,
  },
  backgroundOrbOne: {
    backgroundColor: 'rgba(56, 189, 248, 0.16)',
    borderRadius: 999,
    height: 220,
    position: 'absolute',
    right: -90,
    top: 90,
    width: 220,
  },
  backgroundOrbTwo: {
    backgroundColor: 'rgba(167, 139, 250, 0.16)',
    borderRadius: 999,
    bottom: 180,
    height: 260,
    left: -120,
    position: 'absolute',
    width: 260,
  },
  hero: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 72,
  },
  kickerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 18,
  },
  kickerDot: {
    backgroundColor: '#38bdf8',
    borderRadius: 999,
    height: 9,
    marginRight: 9,
    width: 9,
  },
  kicker: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  heading: {
    color: '#0f172a',
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1.3,
    lineHeight: 47,
    marginBottom: 10,
    maxWidth: 340,
  },
  subheading: {
    color: '#475569',
    fontSize: 17,
    lineHeight: 26,
    maxWidth: 330,
  },
  previewPanel: {
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderColor: 'rgba(15, 23, 42, 0.08)',
    borderRadius: 28,
    borderWidth: 1,
    marginTop: 15,
    padding: 18,
    width: '82%',
  },
  previewPanelHeader: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 18,
  },
  previewDot: {
    backgroundColor: '#38bdf8',
    borderRadius: 999,
    height: 8,
    width: 8,
  },
  previewDotMuted: {
    backgroundColor: '#cbd5e1',
  },
  previewLineLarge: {
    backgroundColor: '#cbd5e1',
    borderRadius: 999,
    height: 14,
    marginBottom: 12,
    width: '72%',
  },
  previewLine: {
    backgroundColor: '#e2e8f0',
    borderRadius: 999,
    height: 10,
    marginBottom: 10,
    width: '92%',
  },
  previewLineShort: {
    backgroundColor: '#e2e8f0',
    borderRadius: 999,
    height: 10,
    width: '52%',
  },
  featureGrid: {
    gap: 10,
    marginTop: 15,
  },
})
