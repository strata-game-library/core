/**
 * Camera Component (Placeholder)
 *
 * This file is a placeholder for camera components that will be extracted from the archive.
 * The preset files reference this module, so this stub ensures the build doesn't fail.
 */

import * as THREE from 'three';

export interface FollowCameraProps {
    target: THREE.Object3D;
    distance?: number;
    height?: number;
    smoothness?: number;
    lookAhead?: number;
}

export interface OrbitCameraProps {
    target: THREE.Vector3;
    distance?: number;
    minDistance?: number;
    maxDistance?: number;
    minPolarAngle?: number;
    maxPolarAngle?: number;
    enableDamping?: boolean;
    dampingFactor?: number;
}

export interface FPSCameraProps {
    sensitivity?: number;
    invertY?: boolean;
    maxPitch?: number;
    minPitch?: number;
}

export interface CinematicCameraProps {
    focusDistance?: number;
    focalLength?: number;
    fStop?: number;
    bokehScale?: number;
}
