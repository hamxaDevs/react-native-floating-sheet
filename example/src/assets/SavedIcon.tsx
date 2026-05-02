import Svg, {
    Path,
    type SvgProps,
} from 'react-native-svg';

type IconProps = SvgProps & {
    color: string;
    size?: number;
};

export function SavedIcon({ color, size = 22, ...props }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
            <Path
                d="M7 5.8C7 4.8 7.8 4 8.8 4H15.2C16.2 4 17 4.8 17 5.8V20L12 16.8L7 20V5.8Z"
                stroke={color}
                strokeWidth={2}
                strokeLinejoin="round"
            />
        </Svg>
    );
}
