/**
 * Decals System (Placeholder)
 *
 * This file is a placeholder for the decals system that will be extracted from the archive.
 * The preset files reference this module, so this stub ensures the build doesn't fail.
 */

import * as THREE from 'three';

export interface DecalOptions {
    position?: THREE.Vector3;
    rotation?: THREE.Euler;
    scale?: THREE.Vector3;
    texture?: THREE.Texture;
    normalMap?: THREE.Texture;
    opacity?: number;
    fadeStart?: number;
    fadeDuration?: number;
}

export interface DecalSystem {
    addDecal(options: DecalOptions): void;
    removeDecal(id: string): void;
    clear(): void;
}
