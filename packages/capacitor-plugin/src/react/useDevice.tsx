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
    // Track mounted state to prevent race condition where cleanup runs before
    // addListener promise resolves, causing memory leaks and React warnings
    let isMounted = true;
    let removeListener: (() => void) | undefined;

    Strata.getDeviceProfile().then(profile => {
      if (isMounted) {
        setProfile(profile);
      }
    });

    Strata.addListener('deviceChange', (newProfile: DeviceProfile) => {
      if (isMounted) {
        setProfile(newProfile);
      }
    }).then(handle => {
      if (isMounted) {
        removeListener = handle.remove;
      } else {
        // Already unmounted - clean up immediately to prevent memory leak
        handle.remove();
      }
    });

    return () => {
      isMounted = false;
      removeListener?.();
    };
  }, []);

  return (
    <DeviceContext.Provider value={profile}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevice(): DeviceProfile {
  return useContext(DeviceContext);
}
