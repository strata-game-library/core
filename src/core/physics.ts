/**
 * Physics System (Placeholder)
 *
 * This file is a placeholder for the physics system that will be extracted from the archive.
 * The preset files reference this module, so this stub ensures the build doesn't fail.
 */

import * as THREE from 'three';

export interface CharacterPhysicsConfig {
    mass?: number;
    friction?: number;
    restitution?: number;
    linearDamping?: number;
    angularDamping?: number;
    maxSpeed?: number;
    acceleration?: number;
    jumpForce?: number;
}

export interface VehiclePhysicsConfig {
    mass?: number;
    engineForce?: number;
    brakeForce?: number;
    steeringClamp?: number;
    suspensionStiffness?: number;
    suspensionDamping?: number;
    wheelFriction?: number;
}

export interface MaterialPhysicsConfig {
    friction?: number;
    restitution?: number;
    density?: number;
}

export interface DestructibleConfig {
    health?: number;
    fragility?: number;
    pieces?: number;
    explosionForce?: number;
}

export interface BuoyancyConfig {
    density?: number;
    dragCoefficient?: number;
    angularDrag?: number;
    waterLevel?: number;
}

export interface PhysicsBody {
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    mass: number;
    applyForce(force: THREE.Vector3): void;
    applyImpulse(impulse: THREE.Vector3): void;
}

export interface PhysicsWorld {
    addBody(body: PhysicsBody): void;
    removeBody(body: PhysicsBody): void;
    step(deltaTime: number): void;
}
