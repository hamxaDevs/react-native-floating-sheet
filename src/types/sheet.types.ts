import type { ComponentType, ReactNode } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';

export type SheetRoute = {
  name: string;
  title: string;
};

export type SheetIconProps = {
  color: string;
  focused: boolean;
  route: SheetRoute;
  size: number;
};

export type SheetIconRenderer = (props: SheetIconProps) => ReactNode;

export type SheetRenderHelpers = {
  currentRouteName: string;
  goTo: (routeName: string) => void;
  isExpanded: boolean;
  open: () => void;
  route: SheetRoute;
};

export type SheetScreenComponentProps = SheetRenderHelpers;

export type SheetScreenOptions = {
  activeDotStyle?: ViewStyle;
  activeTabLabelStyle?: TextStyle;
  activeTabStyle?: ViewStyle;
  activeTintColor?: string;
  contentStyle?: ViewStyle;
  dotStyle?: ViewStyle;
  handleColor?: string;
  hideTabLabel?: boolean;
  hideTitle?: boolean;
  icon?: ReactNode;
  inactiveTintColor?: string;
  renderIcon?: SheetIconRenderer;
  screenBackgroundColor?: string;
  screenStyle?: ViewStyle;
  sheetBackgroundColor?: string;
  showTabDot?: boolean;
  tabBarBackgroundColor?: string;
  tabBarStyle?: ViewStyle;
  tabLabel?: string;
  tabLabelStyle?: TextStyle;
  tabStyle?: ViewStyle;
  title?: string;
};

export type SheetScreenProps = {
  children?: ReactNode | ((helpers: SheetRenderHelpers) => ReactNode);
  component?: ComponentType<SheetScreenComponentProps>;
  name: string;
  options?: SheetScreenOptions;
  title?: string;
};
