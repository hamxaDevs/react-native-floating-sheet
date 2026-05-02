import Svg, {
    Circle,
    Path,
    type SvgProps,
} from 'react-native-svg';

type IconProps = SvgProps & {
    color: string;
    size?: number;
};

export function ExploreIcon({ color, size = 22, ...props }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
            <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={2} />
            <Path
                d="M15.5 8.5L13.4 13.4L8.5 15.5L10.6 10.6L15.5 8.5Z"
                stroke={color}
                strokeWidth={2}
                strokeLinejoin="round"
            />
        </Svg>
    );
}
