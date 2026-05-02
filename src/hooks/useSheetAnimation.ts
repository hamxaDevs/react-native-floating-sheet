import { Animated } from 'react-native';
import { useCallback, useRef, useState } from 'react';
import { clamp } from '../utils';
import { SHEET_ANIMATION } from '../constants';
import type { UseSheetAnimationParams } from '../types';

export function useSheetAnimation({
    initiallyExpanded,
}: UseSheetAnimationParams) {
    const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

    const expansionProgress = useRef(
        new Animated.Value(initiallyExpanded ? 1 : 0)
    ).current;

    const progressValueRef = useRef(initiallyExpanded ? 1 : 0);
    const dragStartProgressRef = useRef(initiallyExpanded ? 1 : 0);

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
        [expansionProgress]
    );

    const openSheet = useCallback(
        (initialVelocity = 0) => {
            animateSheetToProgress(1, initialVelocity);
        },
        [animateSheetToProgress]
    );

    const collapseSheet = useCallback(
        (initialVelocity = 0) => {
            animateSheetToProgress(0, initialVelocity);
        },
        [animateSheetToProgress]
    );

    return {
        isExpanded,
        expansionProgress,
        progressValueRef,
        dragStartProgressRef,
        openSheet,
        collapseSheet,
    };
}
