import Svg, {
    Path,
    type SvgProps,
} from 'react-native-svg';

type IconProps = SvgProps & {
    color: string;
    size?: number;
};

export function ArrowIcon({ color = '#ffffff', size = 18 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12H19"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <Path
        d="M13 6L19 12L13 18"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
