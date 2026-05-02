import { Animated } from 'react-native';
import type { SheetScreenElement } from './navigator.types'
import type { SheetRenderHelpers, SheetScreenOptions } from './sheet.types'

export type SheetContentProps = {
    activeScreen: SheetScreenElement;
    activeOptions: SheetScreenOptions;
    helpers: SheetRenderHelpers;
    isExpanded: boolean;
    collapsedHeight: number;
    contentOpacity: Animated.AnimatedInterpolation<number>;
    contentTranslateY: Animated.AnimatedInterpolation<number>;
    screenProgress: Animated.Value;
    screenTranslateY: Animated.AnimatedInterpolation<number>;
};
