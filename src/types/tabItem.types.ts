import type { ReactNode } from 'react';
import type { SheetRoute, SheetScreenOptions } from '../types';

export type SheetTabItemProps = {
    icon?: ReactNode;
    isActive: boolean;
    label: string;
    route: SheetRoute;
    tintColor: string;
    options: SheetScreenOptions;
    onPress: () => void;
};
