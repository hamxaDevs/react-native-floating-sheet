import Svg, {
    Circle,
    Path,
    type SvgProps,
} from 'react-native-svg';

type IconProps = SvgProps & {
    color: string;
    size?: number;
};

export function ProfileIcon({ color, size = 22, ...props }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
            <Circle cx="12" cy="8" r="3.5" stroke={color} strokeWidth={2} />
            <Path
                d="M5.5 20C6.4 16.7 8.8 15 12 15C15.2 15 17.6 16.7 18.5 20"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
            />
        </Svg>
    );
}
