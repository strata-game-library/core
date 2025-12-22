/**
 * Audio Component Types
 *
 * Shared type definitions for audio components.
 * @category Player Experience
 * @module components/audio
 */

import type * as THREE from 'three';
import type {
    DistanceModel,
    EnvironmentPreset,
    SoundManager,
    SpatialAudio,
} from '../../core/audio';

/**
 * Context value provided by AudioProvider.
 * @category Player Experience
 */
export interface AudioContextValue {
    soundManager: SoundManager | null;
    spatialAudio: SpatialAudio | null;
    listener: THREE.AudioListener | null;
    isReady: boolean;
}

/**
 * Props for the AudioProvider component.
 * @category Player Experience
 */
export interface AudioProviderProps {
    children: React.ReactNode;
    masterVolume?: number;
}

/**
 * Props for the AudioListener component.
 * @category Player Experience
 */
export interface AudioListenerProps {
    camera?: THREE.Camera;
}

/**
 * Props for the PositionalAudio component.
 * @category Player Experience
 */
export interface PositionalAudioProps {
    /** URL of the audio file */
    url: string;
    /** Position in 3D space */
    position?: [number, number, number];
    /** Loop playback */
    loop?: boolean;
    /** Autoplay on load */
    autoplay?: boolean;
    /** Volume (0-1) */
    volume?: number;
    /** Reference distance for attenuation */
    refDistance?: number;
    /** Maximum distance for attenuation */
    maxDistance?: number;
    /** Rolloff factor */
    rolloffFactor?: number;
    /** Distance model for attenuation */
    distanceModel?: DistanceModel;
    /** Playback rate */
    playbackRate?: number;
    /** Callback when audio loads */
    onLoad?: () => void;
    /** Callback when audio ends */
    onEnd?: () => void;
}

/**
 * Ref interface for PositionalAudio imperative control.
 * @category Player Experience
 */
export interface PositionalAudioRef {
    play: () => void;
    pause: () => void;
    stop: () => void;
    setVolume: (volume: number) => void;
    setPosition: (x: number, y: number, z: number) => void;
    isPlaying: () => boolean;
}

/**
 * Props for the AmbientAudio component.
 * @category Player Experience
 */
export interface AmbientAudioProps {
    /** URL of the audio file */
    url: string;
    /** Volume (0-1). Default: 1 */
    volume?: number;
    /** Loop playback. Default: true */
    loop?: boolean;
    /** Autoplay on load. Default: true */
    autoplay?: boolean;
    /** Duration of fade in/out in seconds. Default: 2 */
    fadeTime?: number;
    /** Callback when audio loads */
    onLoad?: () => void;
}

/**
 * Ref interface for AmbientAudio imperative control.
 * @category Player Experience
 */
export interface AmbientAudioRef {
    play: () => void;
    stop: () => void;
    fadeIn: (duration: number) => void;
    fadeOut: (duration: number) => void;
    setVolume: (volume: number, fadeTime?: number) => void;
    isPlaying: () => boolean;
}

/**
 * Props for the AudioZone component.
 * @category Player Experience
 */
export interface AudioZoneProps {
    /** Position of the zone center in 3D space */
    position?: [number, number, number];
    /** Shape of the detection zone */
    geometry: 'box' | 'sphere';
    /** Size of the box zone [width, height, depth] */
    size?: [number, number, number];
    /** Radius of the sphere zone */
    radius?: number;
    /** URL of the background audio for this zone */
    audioUrl?: string;
    /** Volume of the zone audio (0-1) */
    audioVolume?: number;
    /** Loop the zone audio */
    audioLoop?: boolean;
    /** Crossfade duration when entering/exiting */
    fadeTime?: number;
    /** Callback when player enters zone */
    onEnter?: () => void;
    /** Callback when player exits zone */
    onExit?: () => void;
    /** Show debug visualizer for the zone */
    debug?: boolean;
    children?: React.ReactNode;
}

/**
 * Ref interface for AudioZone.
 * @category Player Experience
 */
export interface AudioZoneRef {
    isInside: () => boolean;
    getAudio: () => AmbientAudioRef | null;
}

/**
 * Props for the AudioEmitter component.
 * @category Player Experience
 */
export interface AudioEmitterProps {
    /** URL of the audio file */
    url: string;
    /** Initial position in 3D space */
    position?: [number, number, number];
    /** Object to follow automatically */
    follow?: React.RefObject<THREE.Object3D>;
    /** Loop playback */
    loop?: boolean;
    /** Autoplay on load */
    autoplay?: boolean;
    /** Volume (0-1) */
    volume?: number;
    /** Reference distance for attenuation */
    refDistance?: number;
    /** Maximum distance for attenuation */
    maxDistance?: number;
    /** Rolloff factor */
    rolloffFactor?: number;
    /** Distance model for attenuation */
    distanceModel?: DistanceModel;
    /** Callback when audio loads */
    onLoad?: () => void;
}

/**
 * Ref interface for AudioEmitter.
 * @category Player Experience
 */
export interface AudioEmitterRef {
    play: () => void;
    stop: () => void;
    pause: () => void;
    setVolume: (volume: number) => void;
    setPosition: (x: number, y: number, z: number) => void;
    isPlaying: () => boolean;
}

/**
 * Props for the AudioEnvironment component.
 * @category Player Experience
 */
export interface AudioEnvironmentProps {
    /** Reverb preset type (e.g., 'cave', 'hall') */
    type: EnvironmentPreset;
    /** Reverb decay time in seconds */
    reverbDecay?: number;
    /** Wet/Dry mix (0-1) */
    reverbWet?: number;
    /** Lowpass filter frequency */
    lowpassFrequency?: number;
    /** Highpass filter frequency */
    highpassFrequency?: number;
}

/**
 * Props for the FootstepAudio component.
 * @category Player Experience
 */
export interface FootstepAudioProps {
    /**
     * Map of surface names to audio file URLs or sound IDs.
     * Keys should match surface names detected by raycasting (e.g., texture names or user data).
     * Example: { "grass": "/sounds/grass_step.mp3", "concrete": "concrete_step" }
     */
    surfaces: Record<string, string>;
    /** Default surface to use if detection fails or surface is unmapped */
    defaultSurface?: string;
    /** Playback volume (0-1) */
    volume?: number;
    /** Number of audio sources to pool for polyphony. Default: 5 */
    poolSize?: number;
    /** Minimum time between footstep sounds in milliseconds. Default: 50 */
    throttleMs?: number;
}

/**
 * Ref interface for FootstepAudio.
 * @category Player Experience
 */
export interface FootstepAudioRef {
    playFootstep: (surface?: string, position?: THREE.Vector3) => void;
}

/**
 * Props for the WeatherAudio component.
 * @category Player Experience
 */
export interface WeatherAudioProps {
    /** URL for rain loop sound */
    rainUrl?: string;
    /** URL for thunder sound (randomly triggered) */
    thunderUrl?: string;
    /** URL for wind loop sound */
    windUrl?: string;
    /** Intensity of rain sound (0-1) */
    rainIntensity?: number;
    /** Intensity of wind sound (0-1) */
    windIntensity?: number;
    /** Whether thunder is active */
    thunderActive?: boolean;
    /** Fade duration for intensity changes */
    fadeTime?: number;
}
