import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createTransitionManager } from '../../../src/game/TransitionManager';

describe('TransitionManager', () => {
    let manager: ReturnType<typeof createTransitionManager>;

    beforeEach(() => {
        manager = createTransitionManager();
        vi.useFakeTimers();
    });

    it('should start a transition and complete it', async () => {
        // Mock requestAnimationFrame
        vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
            return setTimeout(() => callback(performance.now()), 16);
        });

        const promise = manager.start({
            type: 'fade',
            duration: 1,
            color: 'black',
        });

        expect(manager.isTransitioning).toBe(true);
        expect(manager.config?.type).toBe('fade');

        vi.advanceTimersByTime(1100);
        await promise;

        expect(manager.isTransitioning).toBe(false);
        expect(manager.progress).toBe(1);
    });

    it('should cancel a transition', async () => {
        const promise = manager.start({ type: 'fade', duration: 1 });
        expect(manager.isTransitioning).toBe(true);

        manager.cancel();
        expect(manager.isTransitioning).toBe(false);
        expect(manager.config).toBeNull();

        await expect(promise).rejects.toThrow('Transition cancelled');
    });

    it('should handle errors in animation loop', async () => {
        const promise = manager.start({
            type: 'fade',
            duration: 1,
            easing: () => {
                throw new Error('Easing error');
            },
        });

        // Mock requestAnimationFrame to trigger the error
        vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
            return setTimeout(() => callback(performance.now()), 16);
        });

        vi.advanceTimersByTime(100);
        await expect(promise).rejects.toThrow('Easing error');
        expect(manager.isTransitioning).toBe(false);
    });
});
