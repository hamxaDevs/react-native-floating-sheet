import { Animated } from 'react-native';

export type UseSheetPanResponderParams = {
    collapseSheet: (initialVelocity?: number) => void;
    dragRange: number;
    dragStartProgressRef: React.MutableRefObject<number>;
    expansionProgress: Animated.Value;
    isExpanded: boolean;
    openSheet: (initialVelocity?: number) => void;
    progressValueRef: React.MutableRefObject<number>;
};
