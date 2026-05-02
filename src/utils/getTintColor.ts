import { SHEET_COLORS } from '../constants';
import type { SheetScreenOptions } from '../types';

export function getTintColor(options: SheetScreenOptions, focused: boolean) {
  return focused
    ? (options.activeTintColor ?? SHEET_COLORS.activeTint)
    : (options.inactiveTintColor ?? SHEET_COLORS.inactiveTint);
}
