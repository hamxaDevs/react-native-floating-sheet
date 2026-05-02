const WARNING_PREFIX = '[react-native-floating-sheet]';

export function warn(message: string) {
  if (!__DEV__) {
    return;
  }

  console.warn(`${WARNING_PREFIX} ${message}`);
}
