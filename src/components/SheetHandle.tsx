import { StyleSheet, View } from 'react-native';
import type { SheetHandleProps } from '../types';
import { SHEET_COLORS, SHEET_LAYOUT } from '../constants';

export function SheetHandle({ color }: SheetHandleProps) {
    return (
        <View style={styles.handleArea}>
            <View
                style={[
                    styles.handle,
                    color ? { backgroundColor: color } : null,
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
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
});
