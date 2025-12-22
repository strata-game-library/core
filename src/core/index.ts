/**
 * @jbcom/strata - Core Module
 * 
 * Lean core logic for procedural generation, math, and rendering foundations.
 * No React dependencies.
 */

// Math & Foundation
export * from './math/index';
export * from './shared/index';
export * from './stateMachine';

// Algorithms
export * from './marching-cubes';
export * from './sdf';
export * from './noise'; // Fallback for legacy
export * from './animation/index';
export * from './instancing';
export * from './lod';
export * from './particles';
export * from './godRays';
export * from './input';
export * from './camera';
export * from './audio/index';
export * from './sky';
export * from './volumetrics';
export * from './water';
export * from './weather';
export * from './postProcessing';
export * from './decals';

// ECS
export * from './ecs/index';
