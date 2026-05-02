import {
  Children,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type {
  SheetNavigatorProps,
  SheetRenderHelpers,
} from "../types";
import { SHEET_ANIMATION } from "../constants/animation";
import { SHEET_COLORS } from "../constants/colors";
import { SHEET_LAYOUT } from "../constants/layout";
import { clamp } from "../utils/clamp";
import { getRouteForScreen } from "../utils/getRouteForScreen";
import { getTabLabel } from "../utils/getTabLabel";
import { getTintColor } from "../utils/getTintColor";
import { isSheetScreen } from "../utils/isSheetScreen";
import { mergeScreenOptions } from "../utils/mergeScreenOptions";
import { renderScreenContent } from "../utils/renderScreenContent";
import { resolveNavigatorOptions } from "../utils/resolveNavigatorOptions";

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
    [children],
  );

  const firstRouteName = screens[0]?.props.name;

  const [activeRouteName, setActiveRouteName] = useState(
    initialRouteName ?? firstRouteName,
  );

  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  const expansionProgress = useRef(
    new Animated.Value(initiallyExpanded ? 1 : 0),
  ).current;

  const progressValueRef = useRef(initiallyExpanded ? 1 : 0);
  const dragStartProgressRef = useRef(initiallyExpanded ? 1 : 0);
  const screenProgress = useRef(new Animated.Value(1)).current;

  const dragRange = Math.max(expandedHeight - collapsedHeight, 1);

  const activeScreen =
    screens.find(screen => screen.props.name === activeRouteName) ?? screens[0];

  const activeRoute = activeScreen
    ? getRouteForScreen(activeScreen)
    : { name: "", title: "" };

  const activeOptions = activeScreen
    ? mergeScreenOptions(
        resolveNavigatorOptions(screenOptions, activeRoute, true),
        activeScreen.props.options,
      )
    : {};

  const animateSheetToProgress = useCallback(
    (toProgress: number, initialVelocity = 0) => {
      const nextProgress = clamp(toProgress, 0, 1);

      if (nextProgress > 0) {
        setIsExpanded(true);
      }

      Animated.spring(expansionProgress, {
        toValue: nextProgress,
        damping: SHEET_ANIMATION.spring.damping,
        mass: SHEET_ANIMATION.spring.mass,
        stiffness: SHEET_ANIMATION.spring.stiffness,
        velocity: initialVelocity,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          progressValueRef.current = nextProgress;
          setIsExpanded(nextProgress > 0);
        }
      });
    },
    [expansionProgress],
  );

  const openSheet = useCallback(
    (initialVelocity = 0) => {
      animateSheetToProgress(1, initialVelocity);
    },
    [animateSheetToProgress],
  );

  const minimizeSheet = useCallback(
    (initialVelocity = 0) => {
      animateSheetToProgress(0, initialVelocity);
    },
    [animateSheetToProgress],
  );

  const sheetPanResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_event, gestureState) => {
          const isVerticalDrag =
            Math.abs(gestureState.dy) > 8 &&
            Math.abs(gestureState.dy) > Math.abs(gestureState.dx);

          if (!isVerticalDrag) {
            return false;
          }

          return isExpanded ? gestureState.dy > 0 : gestureState.dy < 0;
        },

        onPanResponderGrant: () => {
          expansionProgress.stopAnimation(value => {
            const safeValue = clamp(value, 0, 1);

            dragStartProgressRef.current = safeValue;
            progressValueRef.current = safeValue;
          });
        },

        onPanResponderMove: (_event, gestureState) => {
          const nextProgress = clamp(
            dragStartProgressRef.current - gestureState.dy / dragRange,
            0,
            1,
          );

          progressValueRef.current = nextProgress;
          expansionProgress.setValue(nextProgress);
        },

        onPanResponderRelease: (_event, gestureState) => {
          const currentProgress = progressValueRef.current;
          const startedExpanded = dragStartProgressRef.current > 0.5;

          if (gestureState.vy < -SHEET_ANIMATION.velocityThreshold) {
            openSheet(Math.abs(gestureState.vy));
            return;
          }

          if (gestureState.vy > SHEET_ANIMATION.velocityThreshold) {
            minimizeSheet(Math.abs(gestureState.vy));
            return;
          }

          if (startedExpanded) {
            if (currentProgress > SHEET_ANIMATION.keepExpandedThreshold) {
              openSheet();
            } else {
              minimizeSheet();
            }

            return;
          }

          if (currentProgress > SHEET_ANIMATION.expandThresholdFromCollapsed) {
            openSheet();
          } else {
            minimizeSheet();
          }
        },

        onPanResponderTerminate: () => {
          if (progressValueRef.current > 0.5) {
            openSheet();
          } else {
            minimizeSheet();
          }
        },
      }),
    [
      dragRange,
      expansionProgress,
      isExpanded,
      minimizeSheet,
      openSheet,
    ],
  );

  useEffect(() => {
    if (!activeScreen && firstRouteName) {
      setActiveRouteName(firstRouteName);
    }
  }, [activeScreen, firstRouteName]);

  useEffect(() => {
    const listenerId = expansionProgress.addListener(({ value }) => {
      progressValueRef.current = clamp(value, 0, 1);
    });

    return () => {
      expansionProgress.removeListener(listenerId);
    };
  }, [expansionProgress]);

  useEffect(() => {
    if (!activeRouteName) {
      return;
    }

    onRouteChange?.(activeRouteName);

    screenProgress.setValue(0);

    Animated.timing(screenProgress, {
      toValue: 1,
      duration: SHEET_ANIMATION.screenTransitionDuration,
      useNativeDriver: true,
    }).start();
  }, [activeRouteName, onRouteChange, screenProgress]);

  const goTo = useCallback(
    (routeName: string) => {
      setActiveRouteName(routeName);
      openSheet();
    },
    [openSheet],
  );

  const helpers: SheetRenderHelpers = {
    currentRouteName: activeScreen?.props.name ?? "",
    goTo,
    isExpanded,
    minimize: minimizeSheet,
    open: openSheet,
    route: activeRoute,
  };

  const sheetHeight = expansionProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [collapsedHeight, expandedHeight],
  });

  const contentOpacity = expansionProgress.interpolate({
    inputRange: [0, 0.45, 1],
    outputRange: [0, 0, 1],
  });

  const contentTranslateY = expansionProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [24, 0],
  });

  const screenTranslateY = screenProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 0],
  });

  if (!activeScreen) {
    return null;
  }

  return (
    <View pointerEvents="box-none" style={[styles.container, style]}>
      <Animated.View
        {...sheetPanResponder.panHandlers}
        style={[
          styles.sheet,
          { height: sheetHeight },
          sheetStyle,
        ]}
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
            pointerEvents={isExpanded ? "auto" : "none"}
            style={[
              styles.contentWrap,
              activeOptions.contentStyle,
              {
                bottom: collapsedHeight,
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

          <View
            style={[
              styles.tabBar,
              activeOptions.tabBarBackgroundColor
                ? { backgroundColor: activeOptions.tabBarBackgroundColor }
                : null,
              activeOptions.tabBarStyle,
              { height: collapsedHeight },
            ]}
          >
            {screens.map(screen => {
              const isActive = screen.props.name === activeScreen.props.name;
              const route = getRouteForScreen(screen);

              const resolvedOptions = mergeScreenOptions(
                resolveNavigatorOptions(screenOptions, route, isActive),
                screen.props.options,
              );

              const tintColor = getTintColor(resolvedOptions, isActive);
              const tabLabel = getTabLabel(screen, resolvedOptions);
              const shouldShowDot = resolvedOptions.showTabDot ?? true;

              const shouldHideTabLabel =
                resolvedOptions.hideTitle || resolvedOptions.hideTabLabel;

              const icon = resolvedOptions.renderIcon
                ? resolvedOptions.renderIcon({
                    color: tintColor,
                    focused: isActive,
                    route,
                    size: 22,
                  })
                : resolvedOptions.icon;

              return (
                <Pressable
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isActive }}
                  key={screen.props.name}
                  onPress={() => goTo(screen.props.name)}
                  style={[
                    styles.tab,
                    resolvedOptions.tabStyle,
                    isActive ? styles.activeTab : null,
                    isActive ? resolvedOptions.activeTabStyle : null,
                  ]}
                >
                  {icon ? (
                    icon
                  ) : shouldShowDot ? (
                    <View
                      style={[
                        styles.tabDot,
                        { backgroundColor: tintColor },
                        resolvedOptions.dotStyle,
                        isActive ? styles.activeTabDot : null,
                        isActive ? resolvedOptions.activeDotStyle : null,
                      ]}
                    />
                  ) : null}

                  {shouldHideTabLabel ? null : (
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.tabText,
                        {
                          color: isActive
                            ? SHEET_COLORS.activeText
                            : tintColor,
                        },
                        resolvedOptions.tabLabelStyle,
                        isActive ? styles.activeTabText : null,
                        isActive ? resolvedOptions.activeTabLabelStyle : null,
                      ]}
                    >
                      {tabLabel}
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    bottom: "5%",
    left: "5%",
    position: "absolute",
    right: "5%",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "transparent",
    borderRadius: SHEET_LAYOUT.borderRadius,
  },
  surface: {
    backgroundColor: SHEET_COLORS.surface,
    borderRadius: SHEET_LAYOUT.borderRadius,
    borderColor: SHEET_COLORS.border,
    borderWidth: 1,
    flex: 1,
    overflow: "hidden",
  },
  contentWrap: {
    left: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    position: "absolute",
    right: 0,
    top: 0,
  },
  handleArea: {
    alignSelf: "center",
    alignItems: "center",
    height: SHEET_LAYOUT.handleAreaHeight,
    justifyContent: "center",
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
  tabBar: {
    alignItems: "center",
    backgroundColor: SHEET_COLORS.tabBarBackground,
    borderColor: SHEET_COLORS.tabBarBorder,
    bottom: 0,
    flexDirection: "row",
    gap: 6,
    left: 0,
    paddingHorizontal: 10,
    position: "absolute",
    right: 0,
    zIndex: 2,
  },
  tab: {
    alignItems: "center",
    borderRadius: 24,
    flex: 1,
    gap: 6,
    justifyContent: "center",
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
    fontWeight: "800",
    textAlign: "center",
  },
  activeTabText: {
    color: SHEET_COLORS.activeText,
  },
  screen: {
    flex: 1,
    overflow: "hidden",
  },
});