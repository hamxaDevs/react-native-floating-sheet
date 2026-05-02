import type { SheetScreenElement, SheetScreenOptionsInput } from '../types';

export type SheetTabBarProps = {
  screens: SheetScreenElement[];
  activeRouteName: string;
  collapsedHeight: number;
  screenOptions?: SheetScreenOptionsInput;
  tabBarBackgroundColor?: string;
  tabBarStyle?: object;
  onTabPress: (routeName: string) => void;
};
