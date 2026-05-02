import type { SheetScreenOptions } from '../types';

export function mergeScreenOptions(
  navigatorOptions: SheetScreenOptions,
  screenOptions: SheetScreenOptions | undefined
): SheetScreenOptions {
  return {
    ...navigatorOptions,
    ...screenOptions,
  };
}