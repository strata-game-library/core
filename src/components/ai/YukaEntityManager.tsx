import { useFrame } from '@react-three/fiber';
import React, { createContext, useContext, useMemo, useRef } from 'react';
import * as YUKA from 'yuka';
import type { YukaEntityManagerContextValue, YukaEntityManagerProps } from './types';

const YukaContext = createContext<YukaEntityManagerContextValue | null>(null);

/**
 * Hook to access the Yuka context within a YukaEntityManager.
 * Must be used inside a YukaEntityManager component tree.
 *
 * @category Entities & Simulation
 * @returns YukaEntityManagerContextValue with manager and registration functions
 * @throws Error if used outside YukaEntityManager
 */
export function useYukaContext(): YukaEntityManagerContextValue {
    const context = useContext(YukaContext);
    if (!context) {
        throw new Error('useYukaContext must be used within a YukaEntityManager');
    }
    return context;
}

/**
 * Context provider that manages Yuka AI entities and updates them each frame.
 * Must wrap all Yuka-related components in your scene.
 *
 * @category Entities & Simulation
 * @example
 * ```tsx
 * <YukaEntityManager>
 *   <YukaVehicle maxSpeed={5}>
 *     <mesh><boxGeometry /></mesh>
 *   </YukaVehicle>
 * </YukaEntityManager>
 * ```
 */
export function YukaEntityManager({ children }: YukaEntityManagerProps): React.JSX.Element {
    const managerRef = useRef<YUKA.EntityManager>(new YUKA.EntityManager());
    const timeRef = useRef<YUKA.Time>(new YUKA.Time());

    const register = (entity: YUKA.GameEntity) => {
        managerRef.current.add(entity);
    };

    const unregister = (entity: YUKA.GameEntity) => {
        managerRef.current.remove(entity);
    };

    useFrame(() => {
        const delta = timeRef.current.update().getDelta();
        managerRef.current.update(delta);
    });

    const contextValue = useMemo<YukaEntityManagerContextValue>(
        () => ({
            manager: managerRef.current,
            time: timeRef.current,
            register,
            unregister,
        }),
        []
    );

    return <YukaContext.Provider value={contextValue}>{children}</YukaContext.Provider>;
}
