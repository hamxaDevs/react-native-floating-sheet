export const SHEET_ANIMATION = {
  spring: {
    damping: 22,
    mass: 0.9,
    stiffness: 190,
  },
  screenTransitionDuration: 180,
  velocityThreshold: 0.35,
  expandThresholdFromCollapsed: 0.18,
  keepExpandedThreshold: 0.78,
} as const;