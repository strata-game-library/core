import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createModeManager } from '../../../src/game/ModeManager';

describe('ModeManager', () => {
    let manager: ReturnType<typeof createModeManager>;

    beforeEach(() => {
        manager = createModeManager();
    });

    it('should register a mode', () => {
        const mode = {
            id: 'explore',
            systems: [],
            inputMap: {},
        };
        manager.register(mode);
        expect(manager.hasMode('explore')).toBe(true);
    });

    it('should push and pop modes', async () => {
        const onEnter = vi.fn();
        const onExit = vi.fn();
        const mode = {
            id: 'explore',
            systems: [],
            inputMap: {},
            onEnter,
            onExit,
        };

        manager.register(mode);
        await manager.push('explore', { someProp: 'test' });

        expect(onEnter).toHaveBeenCalled();
        const context = onEnter.mock.calls[0][0];
        expect(context.instance.props.someProp).toBe('test');
        expect(manager.current?.config.id).toBe('explore');
        expect(manager.current?.props.someProp).toBe('test');
        expect(manager.stack.length).toBe(1);

        await manager.pop();
        expect(onExit).toHaveBeenCalled();
        expect(manager.current).toBeNull();
    });

    it('should handle mode pausing and resuming', async () => {
        const onPause = vi.fn();
        const onResume = vi.fn();

        const mode1 = { id: 'm1', systems: [], inputMap: {}, onPause, onResume };
        const mode2 = { id: 'm2', systems: [], inputMap: {}, onEnter: vi.fn() };

        manager.register(mode1);
        manager.register(mode2);

        await manager.push('m1');
        await manager.push('m2');

        expect(onPause).toHaveBeenCalled();
        expect(manager.stack.length).toBe(2);

        await manager.pop();
        expect(onResume).toHaveBeenCalled();
        expect(manager.current?.config.id).toBe('m1');
    });

    it('should replace current mode', async () => {
        const onExit1 = vi.fn();
        const onEnter2 = vi.fn();

        const mode1 = { id: 'm1', systems: [], inputMap: {}, onExit: onExit1 };
        const mode2 = { id: 'm2', systems: [], inputMap: {}, onEnter: onEnter2 };

        manager.register(mode1);
        manager.register(mode2);

        await manager.push('m1');
        await manager.replace('m2', { new: true });

        expect(onExit1).toHaveBeenCalled();
        expect(onEnter2).toHaveBeenCalled();
        const context = onEnter2.mock.calls[0][0];
        expect(context.instance.props.new).toBe(true);
        expect(manager.stack.length).toBe(1);
        expect(manager.current?.config.id).toBe('m2');
    });

    it('should handle replace on empty stack', async () => {
        const mode = { id: 'm1', systems: [], inputMap: {}, onEnter: vi.fn() };
        manager.register(mode);
        await manager.replace('m1');
        expect(manager.stack.length).toBe(1);
        expect(manager.current?.config.id).toBe('m1');
    });
});
