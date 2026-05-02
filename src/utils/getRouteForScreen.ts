import type { SheetRoute, SheetScreenElement } from '../types';

export function getBaseScreenTitle(screen: SheetScreenElement) {
  return screen.props.options?.title ?? screen.props.title ?? screen.props.name;
}

export function getRouteForScreen(screen: SheetScreenElement): SheetRoute {
  return {
    name: screen.props.name,
    title: getBaseScreenTitle(screen),
  };
}