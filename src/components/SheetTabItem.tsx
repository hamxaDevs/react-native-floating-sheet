import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { SheetTabItemProps } from '../types';
import { SHEET_COLORS } from '../constants/colors';
import { SHEET_LAYOUT } from '../constants/layout';

export function SheetTabItem({
  icon,
  isActive,
  label,
  tintColor,
  options,
  onPress,
}: SheetTabItemProps) {
  const shouldShowDot = options.showTabDot ?? true;

  const shouldHideTabLabel = options.hideTitle || options.hideTabLabel;

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      onPress={onPress}
      style={[
        styles.tab,
        options.tabStyle,
        isActive ? styles.activeTab : null,
        isActive ? options.activeTabStyle : null,
      ]}
    >
      {icon ? (
        icon
      ) : shouldShowDot ? (
        <View
          style={[
            styles.tabDot,
            { backgroundColor: tintColor },
            options.dotStyle,
            isActive ? styles.activeTabDot : null,
            isActive ? options.activeDotStyle : null,
          ]}
        />
      ) : null}

      {shouldHideTabLabel ? null : (
        <Text
          numberOfLines={1}
          style={[
            styles.tabText,
            {
              color: isActive ? SHEET_COLORS.activeText : tintColor,
            },
            options.tabLabelStyle,
            isActive ? styles.activeTabText : null,
            isActive ? options.activeTabLabelStyle : null,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
    borderRadius: 24,
    flex: 1,
    gap: 6,
    justifyContent: 'center',
    minHeight: SHEET_LAYOUT.tabMinHeight,
    paddingHorizontal: 8,
  },
  activeTab: {
    backgroundColor: SHEET_COLORS.activeTabBackground,
  },
  tabDot: {
    backgroundColor: SHEET_COLORS.handle,
    borderRadius: 999,
    height: 6,
    opacity: 0.42,
    width: 6,
  },
  activeTabDot: {
    backgroundColor: SHEET_COLORS.activeText,
    opacity: 1,
    width: 22,
  },
  tabText: {
    color: SHEET_COLORS.inactiveTint,
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
  },
  activeTabText: {
    color: SHEET_COLORS.activeText,
  },
});
