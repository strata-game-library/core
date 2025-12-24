import type {
    MaterialDefinition,
    MaterialType,
    OrganicProperties,
    ShellProperties,
    VolumetricProperties,
} from './types';

/**
 * Creates a base material definition with common defaults
 */
function createBaseMaterial(
    id: string,
    type: MaterialType,
    options: Partial<MaterialDefinition>
): MaterialDefinition {
    return {
        id,
        type,
        baseColor: '#ffffff',
        roughness: 0.5,
        metalness: 0,
        ...options,
    };
}

/**
 * Creates a fur (shell) material definition
 */
export function createFurMaterial(
    id: string,
    options: Partial<MaterialDefinition> & { shell: Partial<ShellProperties> }
): MaterialDefinition {
    return createBaseMaterial(id, 'shell', {
        ...options,
        shell: {
            layers: 24,
            length: 0.05,
            density: 5000,
            thickness: 0.01,
            curvature: 0.5,
            colorVariation: 0.1,
            ...options.shell,
        },
    });
}

/**
 * Creates a metal material definition
 */
export function createMetalMaterial(
    id: string,
    options: Partial<MaterialDefinition>
): MaterialDefinition {
    return createBaseMaterial(id, 'solid', {
        metalness: 1.0,
        roughness: 0.3,
        ...options,
    });
}

/**
 * Creates a wood material definition
 */
export function createWoodMaterial(
    id: string,
    options: Partial<MaterialDefinition> & { grain?: string }
): MaterialDefinition {
    return createBaseMaterial(id, 'solid', {
        roughness: 0.7,
        metalness: 0,
        ...options,
    });
}

/**
 * Creates a shell material definition (like turtle shell)
 */
export function createShellMaterial(
    id: string,
    options: Partial<MaterialDefinition> & { pattern?: string; segments?: number }
): MaterialDefinition {
    return createBaseMaterial(id, 'solid', {
        roughness: 0.4,
        metalness: 0.1,
        ...options,
    });
}

/**
 * Creates a crystal material definition
 */
export function createCrystalMaterial(
    id: string,
    options: Partial<MaterialDefinition> & { volumetric: Partial<VolumetricProperties> }
): MaterialDefinition {
    return createBaseMaterial(id, 'volumetric', {
        ...options,
        volumetric: {
            refraction: 1.5,
            absorption: '#ffffff',
            transparency: 0.8,
            ...options.volumetric,
        },
    });
}

/**
 * Creates an organic material definition (with SSS)
 */
export function createOrganicMaterial(
    id: string,
    options: Partial<MaterialDefinition> & { organic: Partial<OrganicProperties> }
): MaterialDefinition {
    return createBaseMaterial(id, 'organic', {
        ...options,
        organic: {
            scatterColor: '#ff0000',
            scatterDistance: 0.1,
            ...options.organic,
        },
    });
}
