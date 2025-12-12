/**
 * Audio System (Placeholder)
 *
 * This file is a placeholder for the audio system that will be extracted from the archive.
 * The preset files reference this module, so this stub ensures the build doesn't fail.
 */

export type DistanceModel = 'linear' | 'inverse' | 'exponential';

export type EnvironmentPreset =
    | 'cathedral'
    | 'cave'
    | 'forest'
    | 'underwater'
    | 'city'
    | 'arena';

export interface SpatialConfig {
    distanceModel?: DistanceModel;
    maxDistance?: number;
    refDistance?: number;
    rolloffFactor?: number;
    coneInnerAngle?: number;
    coneOuterAngle?: number;
    coneOuterGain?: number;
}
