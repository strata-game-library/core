/**
 * Post Processing System (Placeholder)
 *
 * This file is a placeholder for the post processing system that will be extracted from the archive.
 * The preset files reference this module, so this stub ensures the build doesn't fail.
 */

export interface BloomEffect {
    strength?: number;
    threshold?: number;
    radius?: number;
}

export interface DOFEffect {
    focusDistance?: number;
    focalLength?: number;
    bokehScale?: number;
}

export interface SSAOEffect {
    radius?: number;
    intensity?: number;
    bias?: number;
    samples?: number;
}

export interface PostProcessingEffect {
    name: string;
    enabled: boolean;
    uniforms?: Record<string, any>;
}

export interface PostProcessingPipeline {
    addEffect(effect: PostProcessingEffect): void;
    removeEffect(name: string): void;
    render(): void;
}

export interface EffectComposer {
    addPass(pass: any): void;
    render(deltaTime?: number): void;
}
