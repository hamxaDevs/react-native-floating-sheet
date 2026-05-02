import { useCallback, useEffect, useMemo, useState } from 'react';
import { getRouteForScreen, warn } from '../utils';
import type { UseSheetNavigationParams } from '../types';

export function useSheetNavigation({
    screens,
    initialRouteName,
    openSheet,
}: UseSheetNavigationParams) {
    const firstRouteName = screens[0]?.props.name;

    const screenNames = useMemo(
        () => new Set(screens.map((screen) => screen.props.name)),
        [screens]
    );

    const [activeRouteName, setActiveRouteName] = useState(
        initialRouteName ?? firstRouteName
    );

    const activeScreen =
        screens.find((screen) => screen.props.name === activeRouteName) ??
        screens[0];

    const activeRoute = activeScreen
        ? getRouteForScreen(activeScreen)
        : { name: '', title: '' };

    useEffect(() => {
        if (!activeScreen && firstRouteName) {
            setActiveRouteName(firstRouteName);
        }
    }, [activeScreen, firstRouteName]);

    const goTo = useCallback(
        (routeName: string) => {
            if (!screenNames.has(routeName)) {
                warn(
                    `goTo("${routeName}") was called, but no matching Sheet.Screen exists.`
                );
                return;
            }

            setActiveRouteName(routeName);
            openSheet();
        },
        [openSheet, screenNames]
    );

    return {
        activeRouteName,
        activeScreen,
        activeRoute,
        goTo,
    };
}
