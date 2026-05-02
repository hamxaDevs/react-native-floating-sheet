import type { SheetScreenElement, SheetScreenOptions } from '../types';

export function getTabLabel(
  screen: SheetScreenElement,
  options: SheetScreenOptions
) {
  return (
    options.tabLabel ?? options.title ?? screen.props.title ?? screen.props.name
  );
}
