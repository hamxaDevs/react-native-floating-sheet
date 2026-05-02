import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

type ScreenShellProps = {
    children: React.ReactNode;
    eyebrow: string;
    title: string;
    description: string;
}

function ScreenShell({
    children,
    eyebrow,
    title,
    description,
}: ScreenShellProps) {
    return (
        <View style={styles.screenShell}>
            <View style={styles.screenHeader}>
                <Text style={styles.screenEyebrow}>{eyebrow}</Text>
                <Text style={styles.screenTitle}>{title}</Text>
                <Text style={styles.screenDescription}>{description}</Text>
            </View>

            {children}
        </View>
    );
}

export default ScreenShell

const styles = StyleSheet.create({
    screenShell: {
        flex: 1,
        paddingHorizontal: 16,
    },
    screenHeader: {
        marginBottom: 14,
    },
    screenEyebrow: {
        color: '#64748b',
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 0.7,
        marginBottom: 5,
        textTransform: 'uppercase',
    },
    screenTitle: {
        color: '#0f172a',
        fontSize: 25,
        fontWeight: '900',
        letterSpacing: -0.4,
        marginBottom: 5,
    },
    screenDescription: {
        color: '#64748b',
        fontSize: 14,
        lineHeight: 20,
    },
});
