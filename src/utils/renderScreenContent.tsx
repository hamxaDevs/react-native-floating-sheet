import type { ReactNode } from 'react';
import type { SheetRenderHelpers, SheetScreenElement } from '../types';

export function renderScreenContent(
  screen: SheetScreenElement,
  helpers: SheetRenderHelpers
): ReactNode {
  const ScreenComponent = screen.props.component;

  if (ScreenComponent) {
    return <ScreenComponent {...helpers} />;
  }

  const { children } = screen.props;

  if (typeof children === 'function') {
    return children(helpers);
  }

  return children;
}