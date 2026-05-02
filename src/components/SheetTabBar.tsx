import { StyleSheet, View } from 'react-native';
import type { SheetRoute, SheetTabBarProps } from '../types';
import { SheetTabItem } from './SheetTabItem';
import { SHEET_COLORS } from '../constants/colors';
import { getTabLabel } from '../utils/getTabLabel';
import { getTintColor } from '../utils/getTintColor';
import { getRouteForScreen } from '../utils/getRouteForScreen';
import { mergeScreenOptions } from '../utils/mergeScreenOptions';
import { resolveNavigatorOptions } from '../utils/resolveNavigatorOptions';

export function SheetTabBar({
  screens,
  activeRouteName,
  collapsedHeight,
  screenOptions,
  tabBarBackgroundColor,
  tabBarStyle,
  onTabPress,
}: SheetTabBarProps) {
  return (
    <View
      style={[
        styles.tabBar,
        tabBarBackgroundColor
          ? { backgroundColor: tabBarBackgroundColor }
          : null,
        tabBarStyle,
        { height: collapsedHeight },
      ]}
    >
      {screens.map((screen) => {
        const isActive = screen.props.name === activeRouteName;
        const route: SheetRoute = getRouteForScreen(screen);

        const resolvedOptions = mergeScreenOptions(
          resolveNavigatorOptions(screenOptions, route, isActive),
          screen.props.options
        );

        const tintColor = getTintColor(resolvedOptions, isActive);
        const tabLabel = getTabLabel(screen, resolvedOptions);

        const icon = resolvedOptions.renderIcon
          ? resolvedOptions.renderIcon({
              color: tintColor,
              focused: isActive,
              route,
              size: 22,
            })
          : resolvedOptions.icon;

        return (
          <SheetTabItem
            key={screen.props.name}
            icon={icon}
            isActive={isActive}
            label={tabLabel}
            route={route}
            tintColor={tintColor}
            options={resolvedOptions}
            onPress={() => onTabPress(screen.props.name)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    alignItems: 'center',
    backgroundColor: SHEET_COLORS.tabBarBackground,
    borderColor: SHEET_COLORS.tabBarBorder,
    bottom: 0,
    flexDirection: 'row',
    gap: 6,
    left: 0,
    paddingHorizontal: 10,
    position: 'absolute',
    right: 0,
    zIndex: 2,
  },
});
