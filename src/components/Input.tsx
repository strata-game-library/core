/**
 * Input Component (Placeholder)
 *
 * This file is a placeholder for input components that will be extracted from the archive.
 * The preset files reference this module, so this stub ensures the build doesn't fail.
 */

export interface JoystickProps {
    size?: number;
    baseColor?: string;
    stickColor?: string;
    maxDistance?: number;
    onMove?: (x: number, y: number) => void;
}

export interface ButtonProps {
    size?: number;
    color?: string;
    pressedColor?: string;
    onPress?: () => void;
    onRelease?: () => void;
}

export interface SwitchProps {
    size?: number;
    onColor?: string;
    offColor?: string;
    initialState?: boolean;
    onChange?: (state: boolean) => void;
}

export interface PlateProps {
    size?: number;
    color?: string;
    pressedColor?: string;
    threshold?: number;
    onActivate?: () => void;
    onDeactivate?: () => void;
}

export interface TriggerProps {
    size?: number;
    range?: number;
    onEnter?: () => void;
    onExit?: () => void;
}
