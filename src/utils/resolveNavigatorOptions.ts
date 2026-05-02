import type {
  SheetRoute,
  SheetScreenOptions,
  SheetScreenOptionsInput,
} from '../types';

export function resolveNavigatorOptions(
  options: SheetScreenOptionsInput | undefined,
  route: SheetRoute,
  focused: boolean
): SheetScreenOptions {
  if (typeof options === 'function') {
    return options({ focused, route });
  }

  return options ?? {};
}