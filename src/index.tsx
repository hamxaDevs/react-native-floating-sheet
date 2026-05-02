import { FloatingSheetScreen } from './components/FloatingSheetScreen';
import { FloatingSheetNavigator } from './components/FloatingSheetNavigator';
export type {
  SheetNavigatorProps,
  SheetScreenElement,
  SheetScreenOptionsInput,
} from './types/navigator.types';
export type {
  SheetIconProps,
  SheetIconRenderer,
  SheetRoute,
  SheetRenderHelpers,
  SheetScreenComponentProps,
  SheetScreenOptions,
  SheetScreenProps,
} from './types/sheet.types';

export const Sheet = {
  Navigator: FloatingSheetNavigator,
  Screen: FloatingSheetScreen,
};
