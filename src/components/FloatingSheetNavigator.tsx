import {
  Animated,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { Children, useEffect, useMemo } from 'react';
import { SheetTabBar } from './SheetTabBar';
import type { SheetNavigatorProps, SheetRenderHelpers } from '../types';
import { SHEET_COLORS, SHEET_LAYOUT } from '../constants';
import {
  clamp,
  isSheetScreen,
  mergeScreenOptions,
  renderScreenContent,
  resolveNavigatorOptions,
  warnSheetScreenValidation,
} from '../utils';
import {
  useScreenTransition,
  useSheetAnimation,
  useSheetNavigation,
  useSheetPanResponder,
} from '../hooks';

export function FloatingSheetNavigator({
  children,
  initialRouteName,
  collapsedHeight = SHEET_LAYOUT.defaultCollapsedHeight,
  expandedHeight = SHEET_LAYOUT.defaultExpandedHeight,
  initiallyExpanded = false,
  screenOptions,
  style,
  sheetStyle,
  onRouteChange,
}: SheetNavigatorProps) {
  const screens = useMemo(
    () => Children.toArray(children).filter(isSheetScreen),
    [children]
  );

  const { height: windowHeight } = useWindowDimensions();

  const resolvedCollapsedHeight = useMemo(
    () =>
      clamp(
        collapsedHeight,
        SHEET_LAYOUT.minCollapsedHeight,
        SHEET_LAYOUT.maxCollapsedHeight
      ),
    [collapsedHeight]
  );

  const resolvedExpandedHeight = useMemo(() => {
    const maxExpandedHeight = Math.floor(
      windowHeight * SHEET_LAYOUT.maxExpandedHeightRatio
    );

    const minExpandedHeight =
      resolvedCollapsedHeight + SHEET_LAYOUT.minExpandedHeightOffset;

    return clamp(expandedHeight, minExpandedHeight, maxExpandedHeight);
  }, [expandedHeight, resolvedCollapsedHeight, windowHeight]);

  const {
    isExpanded,
    expansionProgress,
    progressValueRef,
    dragStartProgressRef,
    openSheet,
    collapseSheet,
  } = useSheetAnimation({
    initiallyExpanded,
  });

  const { activeRouteName, activeScreen, activeRoute, goTo } =
    useSheetNavigation({
      screens,
      initialRouteName,
      openSheet,
    });

  const { screenProgress, screenTranslateY } = useScreenTransition({
    activeRouteName,
    onRouteChange,
  });

  const dragRange = Math.max(
    resolvedExpandedHeight - resolvedCollapsedHeight,
    1
  );

  const sheetPanResponder = useSheetPanResponder({
    collapseSheet,
    dragRange,
    dragStartProgressRef,
    expansionProgress,
    isExpanded,
    openSheet,
    progressValueRef,
  });

  const activeOptions = activeScreen
    ? mergeScreenOptions(
      resolveNavigatorOptions(screenOptions, activeRoute, true),
      activeScreen.props.options
    )
    : {};

  useEffect(() => {
    warnSheetScreenValidation({
      screens,
      initialRouteName,
    });
  }, [screens, initialRouteName]);

  useEffect(() => {
    const listenerId = expansionProgress.addListener(({ value }) => {
      progressValueRef.current = clamp(value, 0, 1);
    });

    return () => {
      expansionProgress.removeListener(listenerId);
    };
  }, [expansionProgress, progressValueRef]);

  const helpers: SheetRenderHelpers = {
    currentRouteName: activeScreen?.props.name ?? '',
    goTo,
    isExpanded,
    open: openSheet,
    route: activeRoute,
  };

  const sheetHeight = expansionProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [resolvedCollapsedHeight, resolvedExpandedHeight],
  });

  const contentOpacity = expansionProgress.interpolate({
    inputRange: [0, 0.45, 1],
    outputRange: [0, 0, 1],
  });

  const contentTranslateY = expansionProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [24, 0],
  });

  if (!activeScreen) {
    return null;
  }

  return (
    <View pointerEvents="box-none" style={[styles.container, style]}>
      <Animated.View
        {...sheetPanResponder.panHandlers}
        style={[styles.sheet, { height: sheetHeight }, sheetStyle]}
      >
        <View
          style={[
            styles.surface,
            activeOptions.sheetBackgroundColor
              ? { backgroundColor: activeOptions.sheetBackgroundColor }
              : null,
          ]}
        >
          <Animated.View
            pointerEvents={isExpanded ? 'auto' : 'none'}
            style={[
              styles.contentWrap,
              activeOptions.contentStyle,
              {
                bottom: resolvedCollapsedHeight,
                opacity: contentOpacity,
                transform: [{ translateY: contentTranslateY }],
              },
            ]}
          >
            <View style={styles.handleArea}>
              <View
                style={[
                  styles.handle,
                  activeOptions.handleColor
                    ? { backgroundColor: activeOptions.handleColor }
                    : null,
                ]}
              />
            </View>

            <Animated.View
              key={activeScreen.props.name}
              style={[
                activeOptions.screenBackgroundColor
                  ? { backgroundColor: activeOptions.screenBackgroundColor }
                  : null,
                styles.screen,
                activeOptions.screenStyle,
                {
                  opacity: screenProgress,
                  transform: [{ translateY: screenTranslateY }],
                },
              ]}
            >
              {renderScreenContent(activeScreen, helpers)}
            </Animated.View>
          </Animated.View>

          <SheetTabBar
            screens={screens}
            activeRouteName={activeScreen.props.name}
            collapsedHeight={resolvedCollapsedHeight}
            screenOptions={screenOptions}
            tabBarBackgroundColor={activeOptions.tabBarBackgroundColor}
            tabBarStyle={activeOptions.tabBarStyle}
            onTabPress={goTo}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    bottom: '5%',
    left: '5%',
    position: 'absolute',
    right: '5%',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: 'transparent',
    borderRadius: SHEET_LAYOUT.borderRadius,
  },
  surface: {
    backgroundColor: SHEET_COLORS.surface,
    borderRadius: SHEET_LAYOUT.borderRadius,
    borderColor: SHEET_COLORS.border,
    borderWidth: 1,
    flex: 1,
    overflow: 'hidden',
  },
  contentWrap: {
    left: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  handleArea: {
    alignSelf: 'center',
    alignItems: 'center',
    height: SHEET_LAYOUT.handleAreaHeight,
    justifyContent: 'center',
    marginBottom: 6,
    width: SHEET_LAYOUT.handleAreaWidth,
  },
  handle: {
    backgroundColor: SHEET_COLORS.handle,
    borderRadius: 999,
    height: SHEET_LAYOUT.handleHeight,
    opacity: 0.55,
    width: SHEET_LAYOUT.handleWidth,
  },
  screen: {
    flex: 1,
    overflow: 'hidden',
  },
});
