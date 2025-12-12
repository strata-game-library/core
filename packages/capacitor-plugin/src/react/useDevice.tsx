import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Strata } from '../index';
import type { DeviceProfile } from '../definitions';

const defaultProfile: DeviceProfile = {
    deviceType: 'desktop',
    platform: 'web',
    inputMode: 'keyboard',
    orientation: 'landscape',
    hasTouch: false,
    hasPointer: true,
    hasGamepad: false,
    isMobile: false,
    isTablet: false,
    isFoldable: false,
    isDesktop: true,
    screenWidth: 1920,
    screenHeight: 1080,
    pixelRatio: 1,
    safeAreaInsets: { top: 0, right: 0, bottom: 0, left: 0 },
};

export const DeviceContext = createContext<DeviceProfile>(defaultProfile);

export function DeviceProvider({ children }: { children: ReactNode }) {
    const [profile, setProfile] = useState<DeviceProfile>(defaultProfile);

    useEffect(() => {
        let isMounted = true;
        let removeListener: (() => void) | undefined;

        // Load initial profile, but only update state if still mounted
        Strata.getDeviceProfile().then((profile) => {
            if (isMounted) {
                setProfile(profile);
            }
        });

        // Add listener and handle cleanup
        Strata.addListener('deviceChange', (newProfile: DeviceProfile) => {
            if (isMounted) {
                setProfile(newProfile);
            }
        }).then((handle) => {
            if (isMounted) {
                removeListener = handle.remove;
            } else {
                // Component unmounted before listener attached, clean up immediately
                handle.remove();
            }
        });

        return () => {
            isMounted = false;
            removeListener?.();
        };
    }, []);

    return <DeviceContext.Provider value={profile}>{children}</DeviceContext.Provider>;
}

export function useDevice(): DeviceProfile {
    return useContext(DeviceContext);
}
