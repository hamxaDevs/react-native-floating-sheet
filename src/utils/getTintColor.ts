import type { SheetScreenOptions } from '../types';
import { SHEET_COLORS } from '../constants/colors';

export function getTintColor(options: SheetScreenOptions, focused: boolean) {
  return focused
    ? (options.activeTintColor ?? SHEET_COLORS.activeTint)
    : (options.inactiveTintColor ?? SHEET_COLORS.inactiveTint);
}
