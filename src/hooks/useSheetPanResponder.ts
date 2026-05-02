import { PanResponder } from 'react-native';
import { useMemo } from 'react';
import { clamp } from '../utils';
import { SHEET_ANIMATION } from '../constants';
import type { UseSheetPanResponderParams } from '../types';

export function useSheetPanResponder({
    collapseSheet,
    dragRange,
    dragStartProgressRef,
    expansionProgress,
    isExpanded,
    openSheet,
    progressValueRef,
}: UseSheetPanResponderParams) {
    return useMemo(
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
                    expansionProgress.stopAnimation((value) => {
                        const safeValue = clamp(value, 0, 1);

                        dragStartProgressRef.current = safeValue;
                        progressValueRef.current = safeValue;
                    });
                },

                onPanResponderMove: (_event, gestureState) => {
                    const nextProgress = clamp(
                        dragStartProgressRef.current - gestureState.dy / dragRange,
                        0,
                        1
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
                        collapseSheet(Math.abs(gestureState.vy));
                        return;
                    }

                    if (startedExpanded) {
                        if (currentProgress > SHEET_ANIMATION.keepExpandedThreshold) {
                            openSheet();
                        } else {
                            collapseSheet();
                        }

                        return;
                    }

                    if (currentProgress > SHEET_ANIMATION.expandThresholdFromCollapsed) {
                        openSheet();
                    } else {
                        collapseSheet();
                    }
                },

                onPanResponderTerminate: () => {
                    if (progressValueRef.current > 0.5) {
                        openSheet();
                    } else {
                        collapseSheet();
                    }
                },
            }),
        [
            collapseSheet,
            dragRange,
            dragStartProgressRef,
            expansionProgress,
            isExpanded,
            openSheet,
            progressValueRef,
        ]
    );
}
