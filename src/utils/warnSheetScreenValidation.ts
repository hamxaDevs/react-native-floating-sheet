import type { SheetScreenElement } from '../types';
import { warn } from './warn';

type WarnSheetScreenValidationParams = {
  screens: SheetScreenElement[];
  initialRouteName?: string;
};

export function warnSheetScreenValidation({
  screens,
  initialRouteName,
}: WarnSheetScreenValidationParams) {
  if (!screens.length) {
    warn('Sheet.Navigator requires at least one Sheet.Screen child.');
    return;
  }

  const screenNames = screens.map((screen) => screen.props.name);
  const seenScreenNames = new Set<string>();
  const duplicateScreenNames = new Set<string>();

  screenNames.forEach((screenName) => {
    if (seenScreenNames.has(screenName)) {
      duplicateScreenNames.add(screenName);
      return;
    }

    seenScreenNames.add(screenName);
  });

  duplicateScreenNames.forEach((screenName) => {
    warn(`Duplicate screen name "${screenName}" found. Screen names must be unique.`);
  });

  if (initialRouteName && !seenScreenNames.has(initialRouteName)) {
    warn(
      `initialRouteName "${initialRouteName}" does not match any registered Sheet.Screen.`
    );
  }
}
