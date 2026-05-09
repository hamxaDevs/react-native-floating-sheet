# react-native-floating-sheet

> A floating bottom-sheet navigator for React Native with expandable tab screens.

`react-native-floating-sheet` gives you a detached bottom tab bar that expands into screen-based sheet content. Each tab is registered as a `Sheet.Screen`, and each screen can navigate to another sheet route with the `goTo(...)` helper.

It is designed for lightweight, tab-based bottom sheet experiences without requiring Reanimated, Gesture Handler, or native setup.

---

## Contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
- [Navigator API](#navigator-api)
- [Screen API](#screen-api)
- [Screen Component Props](#screen-component-props)
- [Navigation](#navigation)
- [Styling](#styling)
- [Labels, Titles, and Icons](#labels-titles-and-icons)
- [Height Behavior](#height-behavior)
- [Route Change Callback](#route-change-callback)
- [Warnings](#warnings)
- [TypeScript](#typescript)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Demo

See `react-native-floating-sheet` running on both iOS and Android.

<table>
  <tr>
    <td align="center">
      <strong>iOS</strong>
    </td>
    <td align="center">
      <strong>Android</strong>
    </td>
  </tr>
  <tr>
    <td align="center">
      <video
        src="https://github.com/hamxaDevs/react-native-floating-sheet/blob/dev/assets/ios_demo.gif"
        width="260"
        controls
      />
      <br />
      <a href="https://github.com/hamxaDevs/react-native-floating-sheet/blob/dev/assets/ios_demo.gif">
        View iOS demo
      </a>
    </td>
    <td align="center">
      <video
        src="https://github.com/hamxaDevs/react-native-floating-sheet/blob/dev/assets/android_demo.gif"
        width="260"
        controls
      />
      <br />
      <a href="https://github.com/hamxaDevs/react-native-floating-sheet/blob/dev/assets/android_demo.gif">
        View Android demo
      </a>
    </td>
  </tr>
</table>

---

## Features

- Floating bottom sheet UI for React Native.
- Collapsed bottom tab bar.
- Expandable screen-based sheet content.
- Lightweight internal navigation between sheet screens.
- `Sheet.Navigator` and `Sheet.Screen` API.
- Per-screen options and shared `screenOptions`.
- Custom tab labels, icons, dots, colors, and styles.
- Built-in drag gestures using React Native `PanResponder`.
- Built-in animations using React Native `Animated`.
- Development warnings for invalid screen setup.
- TypeScript support.

---

## Installation

```sh
npm install react-native-floating-sheet
```

or:

```sh
yarn add react-native-floating-sheet
```

---

## Prerequisites

The package declares `react` and `react-native` as peer dependencies:

```json
{
  "react": "*",
  "react-native": "*"
}
```

The library uses React Native's built-in `Animated` and `PanResponder` APIs.

You do **not** need:

- `react-native-reanimated`
- `react-native-gesture-handler`
- any extra native module for the sheet itself

If you want to render icons using something like `react-native-svg`, install and configure that package separately in your app. Icons are user-provided UI and are not bundled by this library.

---

## Quick Start

```tsx
import { Button, Text, View } from 'react-native';
import {
  Sheet,
  type SheetScreenComponentProps,
} from 'react-native-floating-sheet';

function PreviewScreen({ route, goTo }: SheetScreenComponentProps) {
  return (
    <View>
      <Text>{route.title}</Text>
      <Text>This content appears when the sheet is expanded.</Text>

      <Button title="Go to Details" onPress={() => goTo('Details')} />
    </View>
  );
}

function DetailsScreen({ route }: SheetScreenComponentProps) {
  return (
    <View>
      <Text>{route.title}</Text>
      <Text>Details content</Text>
    </View>
  );
}

export function App() {
  return (
    <View style={{ flex: 1 }}>
      <Sheet.Navigator initialRouteName="Preview">
        <Sheet.Screen name="Preview" component={PreviewScreen} />
        <Sheet.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: 'Details',
          }}
        />
      </Sheet.Navigator>
    </View>
  );
}
```

The public API is intentionally small:

```tsx
import { Sheet } from 'react-native-floating-sheet';

<Sheet.Navigator>
  <Sheet.Screen name="Preview" component={PreviewScreen} />
</Sheet.Navigator>;
```

---

## Core Concepts

`Sheet.Navigator` renders an absolutely positioned floating sheet near the bottom of the screen.

In the collapsed state, only the bottom tab bar is visible.

The sheet expands when:

- the user taps a tab
- the user drags the collapsed sheet upward
- a screen calls `goTo(...)`

Each tab is a `Sheet.Screen`. The active screen is rendered inside the expanded sheet content area.

This package is **not** a full app navigation solution. It does not replace React Navigation, deep linking, modal stacks, or native navigation. It is focused on lightweight navigation inside a floating bottom sheet.

---

## Navigator API

```tsx
<Sheet.Navigator
  initialRouteName="Explore"
  collapsedHeight={88}
  expandedHeight={520}
  initiallyExpanded={false}
  onRouteChange={(routeName) => {
    console.log(routeName);
  }}
  screenOptions={({ focused, route }) => ({
    activeTintColor: '#ffffff',
    inactiveTintColor: '#64748b',
    tabBarBackgroundColor: '#f8fafc',
    sheetBackgroundColor: '#ffffff',
    showTabDot: !focused,
    tabLabel: route.title,
  })}
>
  <Sheet.Screen name="Explore" component={ExploreScreen} />
  <Sheet.Screen name="Saved" component={SavedScreen} />
</Sheet.Navigator>
```

### `Sheet.Navigator` Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | Required | Direct `Sheet.Screen` children. |
| `initialRouteName` | `string` | First screen name | Initial active sheet route. |
| `collapsedHeight` | `number` | `82` | Height of the collapsed tab bar area. Internally clamped for safe layout. |
| `expandedHeight` | `number` | `430` | Height of the expanded sheet. Internally capped to stay within the screen. |
| `initiallyExpanded` | `boolean` | `false` | Whether the sheet starts expanded. |
| `screenOptions` | `SheetScreenOptions` or function | `undefined` | Shared visual and tab options for all screens. Screen-level options override these values. |
| `style` | `ViewStyle` | `undefined` | Style for the outer absolute-positioned container. |
| `sheetStyle` | `ViewStyle` | `undefined` | Style for the animated sheet container. Useful for shadows or elevation. |
| `onRouteChange` | `(routeName: string) => void` | `undefined` | Called when the active sheet route changes. |

### Function-Based `screenOptions`

`screenOptions` may be an object or a function.

```tsx
<Sheet.Navigator
  screenOptions={({ focused, route }) => ({
    activeTintColor: focused ? '#ffffff' : '#2563eb',
    tabLabel: route.title,
  })}
>
```

The function receives:

| Prop | Type | Description |
| --- | --- | --- |
| `focused` | `boolean` | Whether the screen is currently active. |
| `route` | `{ name: string; title: string }` | The resolved route object for the screen. |

---

## Screen API

`Sheet.Screen` registers a sheet route. It does not render by itself. `Sheet.Navigator` reads each screen and renders the active one.

```tsx
<Sheet.Screen
  name="Profile"
  title="Profile"
  component={ProfileScreen}
  options={{
    tabLabel: 'Me',
    showTabDot: false,
  }}
/>
```

### `Sheet.Screen` Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes | Unique route name. Used by tabs and `goTo(...)`. |
| `component` | `ComponentType<SheetScreenComponentProps>` | No | Component rendered for this screen. Receives screen helpers as props. |
| `children` | `ReactNode` or render function | No | Alternative screen content. A function child receives the same helpers. |
| `title` | `string` | No | Screen title used for `route.title` and fallback tab label. |
| `options` | `SheetScreenOptions` | No | Per-screen styling and tab options. Overrides matching navigator `screenOptions`. |

If `component` is provided, it takes precedence over `children`.

### Render Function Example

```tsx
<Sheet.Screen name="Actions">
  {({ goTo, route }) => (
    <ActionsView title={route.title} onDone={() => goTo('Preview')} />
  )}
</Sheet.Screen>
```

---

## Screen Component Props

Screen components receive `SheetScreenComponentProps`.

```tsx
import type { SheetScreenComponentProps } from 'react-native-floating-sheet';

function ExploreScreen({
  route,
  goTo,
  currentRouteName,
  isExpanded,
}: SheetScreenComponentProps) {
  return null;
}
```

| Prop | Type | Description |
| --- | --- | --- |
| `route` | `{ name: string; title: string }` | The current screen route. |
| `goTo` | `(routeName: string) => void` | Switches to another registered sheet screen and opens the sheet. |
| `currentRouteName` | `string` | Name of the active route. |
| `isExpanded` | `boolean` | Whether the sheet is currently expanded. |

There is no public `open`, `collapse`, or `minimize` helper on screen props.

Opening happens through:

- tab presses
- upward drag gestures
- `goTo(...)`

---

## Navigation

Use `goTo(...)` inside a screen to switch to another registered sheet route.

```tsx
import { Button } from 'react-native';
import type { SheetScreenComponentProps } from 'react-native-floating-sheet';

function SavedScreen({ goTo }: SheetScreenComponentProps) {
  return (
    <Button title="Open profile" onPress={() => goTo('Profile')} />
  );
}
```

`goTo(...)` only accepts registered `Sheet.Screen` names.

If the route name does not exist, the library warns in development and keeps the current route.

```tsx
goTo('UnknownRoute'); // Development warning
```

---

## Styling

You can style the sheet in three places:

1. `Sheet.Navigator` props such as `style` and `sheetStyle`
2. shared `screenOptions`
3. per-screen `options`

```tsx
<Sheet.Navigator
  style={{ left: 16, right: 16, bottom: 24 }}
  sheetStyle={{
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 8,
  }}
  screenOptions={{
    sheetBackgroundColor: '#ffffff',
    screenBackgroundColor: '#ffffff',
    contentStyle: { paddingHorizontal: 20 },
    handleColor: '#cbd5e1',
    tabBarBackgroundColor: '#f8fafc',
    activeTintColor: '#ffffff',
    inactiveTintColor: '#64748b',
    tabStyle: { borderRadius: 24 },
    activeTabStyle: { backgroundColor: '#0f172a' },
  }}
>
  <Sheet.Screen name="Preview" component={PreviewScreen} />
</Sheet.Navigator>
```

### `SheetScreenOptions`

These options can be supplied through navigator `screenOptions` or through a screen's `options` prop.

Screen-level `options` override navigator-level `screenOptions`.

| Option | Type | Description |
| --- | --- | --- |
| `title` | `string` | Screen title used for `route.title` and as a fallback tab label. |
| `tabLabel` | `string` | Label shown in the tab bar. |
| `hideTabLabel` | `boolean` | Hides the built-in tab label. |
| `hideTitle` | `boolean` | Also hides the built-in tab label in the current implementation. The library does not render a separate screen title header. |
| `icon` | `ReactNode` | Static icon node for the tab. |
| `renderIcon` | `(props: SheetIconProps) => ReactNode` | Dynamic icon renderer. Takes precedence over `icon`. |
| `showTabDot` | `boolean` | Shows the default dot when no icon is provided. Defaults to `true`. |
| `sheetBackgroundColor` | `string` | Inner rounded sheet surface background. |
| `screenBackgroundColor` | `string` | Active screen container background. |
| `contentStyle` | `ViewStyle` | Content wrapper above the tab bar. |
| `screenStyle` | `ViewStyle` | Active screen animated view. |
| `handleColor` | `string` | Drag handle color. |
| `tabBarBackgroundColor` | `string` | Tab bar background. |
| `tabBarStyle` | `ViewStyle` | Tab bar container style. |
| `tabStyle` | `ViewStyle` | Individual tab pressable style. |
| `activeTabStyle` | `ViewStyle` | Active tab pressable style. |
| `tabLabelStyle` | `TextStyle` | Tab label text style. |
| `activeTabLabelStyle` | `TextStyle` | Active tab label text style. |
| `dotStyle` | `ViewStyle` | Default tab dot style. |
| `activeDotStyle` | `ViewStyle` | Active tab dot style. |
| `activeTintColor` | `string` | Active tab tint color. |
| `inactiveTintColor` | `string` | Inactive tab tint color. |

---

## Labels, Titles, and Icons

Titles and labels are resolved in this order:

### `route.title`

```txt
options.title -> screen title -> screen name
```

### Tab label

```txt
options.tabLabel -> options.title -> screen title -> screen name
```

### Hide Tab Labels

```tsx
<Sheet.Screen
  name="Search"
  component={SearchScreen}
  options={{
    hideTabLabel: true,
  }}
/>
```

Both `hideTabLabel` and `hideTitle` hide the built-in tab label.

### Dynamic Icons

Use `renderIcon` when you want the icon to react to active/inactive state.

```tsx
<Sheet.Screen
  name="Explore"
  component={ExploreScreen}
  options={{
    title: 'Explore',
    showTabDot: false,
    renderIcon: ({ color, focused, route, size }) => (
      <ExploreIcon
        color={color}
        focused={focused}
        label={route.name}
        size={size}
      />
    ),
  }}
/>
```

`renderIcon` receives:

| Prop | Type | Description |
| --- | --- | --- |
| `color` | `string` | Active or inactive tint color. |
| `focused` | `boolean` | Whether this tab is active. |
| `route` | `{ name: string; title: string }` | The tab route. |
| `size` | `number` | Current icon size. The built-in tab bar passes `22`. |

### Static Icons

You can also pass a static `icon` node.

```tsx
<Sheet.Screen
  name="Create"
  component={CreateScreen}
  options={{
    icon: <Text>+</Text>,
    showTabDot: false,
  }}
/>
```

If no icon is provided, the tab can render a small dot. `showTabDot` defaults to `true`.

---

## Height Behavior

The navigator accepts two height props:

| Prop | Description |
| --- | --- |
| `collapsedHeight` | Height of the visible collapsed tab bar area. |
| `expandedHeight` | Total height of the expanded sheet. |

The built-in tab bar height follows `collapsedHeight`.

```tsx
<Sheet.Navigator collapsedHeight={88} expandedHeight={520}>
  ...
</Sheet.Navigator>
```

The library clamps these values to keep the sheet usable:

| Value | Clamp |
| --- | --- |
| `collapsedHeight` | Minimum `64`, maximum `120`. |
| `expandedHeight` | Minimum `collapsedHeight + 160`, maximum `90%` of the window height. |

Because of this, the final rendered height may differ from the number you pass.

---

## Route Change Callback

Use `onRouteChange` to listen for active sheet route changes.

```tsx
<Sheet.Navigator
  onRouteChange={(routeName) => {
    analytics.track('Sheet route changed', { routeName });
  }}
>
  <Sheet.Screen name="Explore" component={ExploreScreen} />
</Sheet.Navigator>
```

`onRouteChange` belongs directly on `Sheet.Navigator`.

Correct:

```tsx
<Sheet.Navigator
  onRouteChange={(routeName) => {
    console.log('Active route:', routeName);
  }}
>
```

Incorrect:

```tsx
<Sheet.Navigator
  screenOptions={{
    onRouteChange: () => {},
  }}
>
```

`screenOptions` is for visual, tab, and screen configuration. `onRouteChange` is a navigator-level callback.

`onRouteChange` is also called for the initial active route after the navigator mounts.

If your parent component re-renders often, prefer a stable callback:

```tsx
const handleRouteChange = React.useCallback((routeName: string) => {
  console.log(routeName);
}, []);

<Sheet.Navigator onRouteChange={handleRouteChange}>
  ...
</Sheet.Navigator>;
```

---

## Full Example

```tsx
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  Sheet,
  type SheetScreenComponentProps,
} from 'react-native-floating-sheet';

function ExploreScreen({ route, goTo }: SheetScreenComponentProps) {
  return (
    <View>
      <Text>{route.title}</Text>
      <Text>Explore screen content.</Text>

      <Pressable onPress={() => goTo('Saved')}>
        <Text>Go to Saved</Text>
      </Pressable>
    </View>
  );
}

function SavedScreen({ route, goTo }: SheetScreenComponentProps) {
  return (
    <View>
      <Text>{route.title}</Text>
      <Text>Saved screen content.</Text>

      <Pressable onPress={() => goTo('Profile')}>
        <Text>Go to Profile</Text>
      </Pressable>
    </View>
  );
}

function ProfileScreen({ route, goTo }: SheetScreenComponentProps) {
  return (
    <View>
      <Text>{route.title}</Text>
      <Text>Profile screen content.</Text>

      <Pressable onPress={() => goTo('Explore')}>
        <Text>Back to Explore</Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Sheet.Navigator
        initialRouteName="Explore"
        collapsedHeight={88}
        expandedHeight={520}
        onRouteChange={(routeName) => {
          console.log('Active sheet route:', routeName);
        }}
        screenOptions={{
          activeTintColor: '#ffffff',
          inactiveTintColor: '#64748b',
          sheetBackgroundColor: '#ffffff',
          tabBarBackgroundColor: '#f8fafc',
          handleColor: '#cbd5e1',
          showTabDot: true,
        }}
      >
        <Sheet.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            title: 'Explore',
          }}
        />

        <Sheet.Screen
          name="Saved"
          component={SavedScreen}
          options={{
            title: 'Saved',
          }}
        />

        <Sheet.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
          }}
        />
      </Sheet.Navigator>
    </View>
  );
}
```

For a more polished demo, see the example app in the repository.

---

## Warnings

Development warnings are logged with this prefix:

```txt
[react-native-floating-sheet]
```

You may see warnings when:

- `Sheet.Navigator` has no valid `Sheet.Screen` children.
- Duplicate `Sheet.Screen` names are used.
- `initialRouteName` does not match any registered screen.
- `goTo("...")` is called with an unknown route name.

Warnings are only emitted in development builds.

---

## TypeScript

Types are included.

Most users will mainly need:

- `SheetScreenComponentProps`
- `SheetNavigatorProps`
- `SheetScreenOptions`

Additional exported types include:

- `SheetScreenOptionsInput`
- `SheetScreenElement`
- `SheetRoute`
- `SheetIconProps`
- `SheetIconRenderer`
- `SheetRenderHelpers`
- `SheetScreenProps`

---

## Roadmap

Possible future additions:

- Multiple snap points.
- Controlled active route.
- Controlled open/closed state.
- Ref-based imperative helpers.
- Custom tab bar renderer.
- Custom handle renderer.
- Backdrop support.
- Keyboard and safe-area convenience props.
- More accessibility configuration.
- Optional integration patterns for React Navigation.
- Optional Reanimated / Gesture Handler support.

These are roadmap ideas and are not part of the current public API.

---

## Contributing

Contributions are welcome.

To contribute:

1. Fork the repository.
2. Create a new branch for your change.
3. Make your changes.
4. Run the project checks.
5. Commit and push your changes.
6. Open a pull request.

Please follow the existing coding conventions and keep examples clear and easy to understand.

---

## License

MIT

Repository: [hamxaDevs/react-native-floating-sheet](https://github.com/hamxaDevs/react-native-floating-sheet)
