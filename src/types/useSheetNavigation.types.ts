import type { SheetScreenElement } from './navigator.types'

export type UseSheetNavigationParams = {
    screens: SheetScreenElement[];
    initialRouteName?: string;
    openSheet: (initialVelocity?: number) => void;
};
