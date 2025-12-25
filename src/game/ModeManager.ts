import type React from 'react';
import { create } from 'zustand';
import type { SystemFn } from '../core/ecs/types';
import type { Game, ModeContext } from './types';

/**
 * Unique identifier for a game mode.
 */
export type GameMode = string;

/**
 * Defines input mappings for a specific game mode.
 */
export interface InputMapping {
    [action: string]: {
        /** Keyboard keys that trigger this action. */
        keyboard?: string[];
        /** Gamepad button name or index. */
        gamepad?: string | number;
        /** Whether device tilt/motion is used. */
        tilt?: boolean;
    };
}

/**
 * Configuration for a game mode.
 */
export interface ModeConfig {
    /** Unique identifier for the mode. */
    id: GameMode;
    /** ECS systems active during this mode. */
    systems: SystemFn<any>[];
    /** Input mappings for this mode. */
    inputMap: InputMapping;
    /** Optional React UI overlay for this mode. */
    ui?: React.ComponentType<{ instance: ModeInstance }>;
    /** Called before the mode becomes active. */
    setup?: (context: ModeContext) => Promise<void>;
    /** Called after the mode is removed. */
    teardown?: (context: ModeContext) => Promise<void>;
    /** Called when the mode becomes active. */
    onEnter?: (context: ModeContext) => void;
    /** Called when the mode is removed. */
    onExit?: (context: ModeContext) => void;
    /** Called when another mode is pushed on top of this one. */
    onPause?: (context: ModeContext) => void;
    /** Called when returning to this mode after a top mode is popped. */
    onResume?: (context: ModeContext) => void;
}

/**
 * A runtime instance of a game mode, combining static config with dynamic props.
 */
export interface ModeInstance {
    /** The static configuration for this mode. */
    config: ModeConfig;
    /** Dynamic props passed when activating the mode. */
    props: any;
    /** Timestamp when this mode instance was created. */
    pushedAt: number;
}

/**
 * Internal state for the ModeManager.
 */
interface ModeState {
    modes: Map<GameMode, ModeConfig>;
    current: ModeInstance | null;
    stack: ModeInstance[];
}

/**
 * Public interface for the ModeManager.
 */
export interface ModeManager {
    /** Registers a new game mode configuration. */
    register: (mode: ModeConfig) => void;
    /** Pushes a new mode onto the stack. */
    push: (modeId: GameMode, props?: any) => Promise<void>;
    /** Removes the top mode from the stack. */
    pop: () => Promise<void>;
    /** Replaces the current mode with a new one. */
    replace: (modeId: GameMode, props?: any) => Promise<void>;
    /** The currently active mode instance. */
    current: ModeInstance | null;
    /** The stack of active mode instances. */
    stack: ModeInstance[];
    /** Retrieves a registered mode configuration. */
    getConfig: (modeId: GameMode) => ModeConfig | undefined;
    /** Checks if a specific mode is currently active. */
    isActive: (modeId: GameMode) => boolean;
    /** Checks if a specific mode configuration is registered. */
    hasMode: (modeId: GameMode) => boolean;
}

/**
 * Creates a new ModeManager instance.
 *
 * @param defaultMode - Optional ID of the initial mode to activate.
 * @param gameGetter - Getter for the game instance to provide context.
 * @returns A ModeManager instance.
 */
export function createModeManager(defaultMode?: GameMode, gameGetter?: () => Game): ModeManager {
    const useStore = create<ModeState>(() => ({
        modes: new Map(),
        current: null,
        stack: [],
    }));

    const getContext = (instance: ModeInstance): ModeContext => {
        const game = gameGetter ? gameGetter() : ({} as Game);
        return {
            game,
            world: game.world,
            modeManager: manager,
            sceneManager: game.sceneManager,
            instance,
        };
    };

    const manager: ModeManager = {
        register: (mode: ModeConfig) => {
            useStore.getState().modes.set(mode.id, mode);
        },

        push: async (modeId: GameMode, props: any = {}) => {
            const state = useStore.getState();
            const config = state.modes.get(modeId);
            if (!config) throw new Error(`Mode "${modeId}" not registered.`);

            // Pause current mode if it exists
            if (state.current) {
                state.current.config.onPause?.(getContext(state.current));
            }

            const instance: ModeInstance = {
                config,
                props,
                pushedAt: Date.now(),
            };

            const context = getContext(instance);
            await config.setup?.(context);
            config.onEnter?.(context);

            useStore.setState((prev) => ({
                stack: [...prev.stack, instance],
                current: instance,
            }));
        },

        pop: async () => {
            const state = useStore.getState();
            if (state.stack.length === 0) return;

            const topInstance = state.stack[state.stack.length - 1];
            const context = getContext(topInstance);

            topInstance.config.onExit?.(context);
            await topInstance.config.teardown?.(context);

            useStore.setState((prev) => {
                const newStack = prev.stack.slice(0, -1);
                const nextMode = newStack[newStack.length - 1] || null;

                if (nextMode) {
                    nextMode.config.onResume?.(getContext(nextMode));
                }

                return {
                    stack: newStack,
                    current: nextMode,
                };
            });
        },

        replace: async (modeId: GameMode, props: any = {}) => {
            const state = useStore.getState();
            const config = state.modes.get(modeId);
            if (!config) throw new Error(`Mode "${modeId}" not registered.`);

            if (state.current) {
                const context = getContext(state.current);
                state.current.config.onExit?.(context);
                await state.current.config.teardown?.(context);
            }

            const instance: ModeInstance = {
                config,
                props,
                pushedAt: Date.now(),
            };

            const context = getContext(instance);
            await config.setup?.(context);
            config.onEnter?.(context);

            useStore.setState((prev) => {
                const newStack =
                    prev.stack.length > 0 ? [...prev.stack.slice(0, -1), instance] : [instance];
                return {
                    stack: newStack,
                    current: instance,
                };
            });
        },

        getConfig: (modeId: GameMode) => {
            return useStore.getState().modes.get(modeId);
        },

        isActive: (modeId: GameMode) => {
            const current = useStore.getState().current;
            return current?.config.id === modeId;
        },

        hasMode: (modeId: GameMode) => {
            return useStore.getState().modes.has(modeId);
        },

        get current() {
            return useStore.getState().current;
        },
        get stack() {
            return useStore.getState().stack;
        },
    };

    if (defaultMode) {
        // Start initial mode if it exists
        manager.push(defaultMode).catch(console.error);
    }

    return manager;
}
