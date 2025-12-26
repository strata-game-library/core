import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { createFurSystem } from '../index';

describe('createFurSystem', () => {
    it('should set userData.isFurGroup to true', () => {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial();
        const furSystem = createFurSystem(geometry, material, { layerCount: 1 });

        expect(furSystem.userData.isFurGroup).toBe(true);
    });
});
