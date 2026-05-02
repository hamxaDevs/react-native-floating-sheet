import { Animated, StyleSheet } from 'react-native';
import { SheetHandle } from './SheetHandle';
import { renderScreenContent } from '../utils';
import type { SheetContentProps } from '../types';

export function SheetContent({
    activeScreen,
    activeOptions,
    helpers,
    isExpanded,
    collapsedHeight,
    contentOpacity,
    contentTranslateY,
    screenProgress,
    screenTranslateY,
}: SheetContentProps) {
    return (
        <Animated.View
            pointerEvents={isExpanded ? 'auto' : 'none'}
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
            <SheetHandle color={activeOptions.handleColor} />

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
    );
}

const styles = StyleSheet.create({
    contentWrap: {
        left: 0,
        paddingHorizontal: 16,
        paddingTop: 12,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    screen: {
        flex: 1,
        overflow: 'hidden',
    },
});
