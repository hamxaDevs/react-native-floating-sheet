import { isValidElement, type ReactNode } from 'react';
import type { SheetScreenElement, SheetScreenProps } from '../types';

export function isSheetScreen(child: ReactNode): child is SheetScreenElement {
  return isValidElement<SheetScreenProps>(child);
}