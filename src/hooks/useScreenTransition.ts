import { Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { SHEET_ANIMATION } from '../constants';

type UseScreenTransitionParams = {
    activeRouteName?: string;
    onRouteChange?: (routeName: string) => void;
};

export function useScreenTransition({
    activeRouteName,
    onRouteChange,
}: UseScreenTransitionParams) {
    const screenProgress = useRef(new Animated.Value(1)).current;

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

    const screenTranslateY = screenProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 0],
    });

    return {
        screenProgress,
        screenTranslateY,
    };
}
