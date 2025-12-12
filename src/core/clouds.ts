/**
 * Clouds System (Placeholder)
 *
 * This file is a placeholder for the clouds system that will be extracted from the archive.
 * The preset files reference this module, so this stub ensures the build doesn't fail.
 */

export interface CloudConfig {
    density?: number;
    coverage?: number;
    scale?: number;
    speed?: number;
    height?: number;
    thickness?: number;
}

export type CloudType = 'cumulus' | 'stratus' | 'cirrus' | 'storm';

export interface CloudLayer {
    type: CloudType;
    config: CloudConfig;
}
