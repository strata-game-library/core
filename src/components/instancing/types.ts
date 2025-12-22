import type * as THREE from 'three';
import type { BiomeData as CoreBiomeData, InstanceData as CoreInstanceData } from '../../core/instancing';

/**
 * Data for a single instance (position, rotation, scale).
 * @category World Building
 */
export type InstanceData = CoreInstanceData;

/**
 * Biome data for placement logic.
 * @category World Building
 */
export type BiomeData = CoreBiomeData;

/**
 * Configuration props for vegetation components.
 * @category World Building
 * @interface VegetationProps
 */
export interface VegetationProps {
    /** Total number of instances to generate. Default depends on component. */
    count?: number;
    /** Size of the area (square) to scatter instances in. Default: 100. */
    areaSize?: number;
    /** Array of biome data for placement logic. Default: Standard marsh/forest/savanna set. */
    biomes?: BiomeData[];
    /** Function to sample terrain height at (x, z). Default: flat ground (y=0). */
    heightFunc?: (x: number, z: number) => number;
    /** Base height of the instances for scaling geometry. Default: 1.0. */
    height?: number;
    /** Base color of the instances. Default depends on component. */
    color?: THREE.ColorRepresentation;
}
