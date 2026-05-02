import type { ReactElement, ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import type {
  SheetRoute,
  SheetScreenProps,
  SheetScreenOptions,
} from './sheet.types';

export type SheetScreenOptionsInput =
  | SheetScreenOptions
  | ((params: { focused: boolean; route: SheetRoute }) => SheetScreenOptions);

export type SheetNavigatorProps = {
  children: ReactNode;
  initialRouteName?: string;
  title?: string;
  collapsedHeight?: number;
  expandedHeight?: number;
  initiallyExpanded?: boolean;
  screenOptions?: SheetScreenOptionsInput;
  style?: ViewStyle;
  sheetStyle?: ViewStyle;
  onRouteChange?: (routeName: string) => void;
};

export type SheetScreenElement = ReactElement<SheetScreenProps>;
