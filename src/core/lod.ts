/**
 * LOD (Level of Detail) System (Placeholder)
 *
 * This file is a placeholder for the LOD system that will be extracted from the archive.
 * The preset files reference this module, so this stub ensures the build doesn't fail.
 */

import * as THREE from 'three';

export interface LODLevel {
    distance: number;
    object: THREE.Object3D;
}

export interface LODConfig {
    levels: LODLevel[];
    hysteresis?: number;
}

export interface LODSystem {
    addObject(id: string, config: LODConfig): void;
    removeObject(id: string): void;
    update(camera: THREE.Camera): void;
}
