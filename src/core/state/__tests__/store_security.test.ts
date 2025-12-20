
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createGameStore } from '../store';
import { calculateChecksum, SaveData } from '../types';

interface TestState {
    count: number;
    name: string;
}

const initialState: TestState = {
    count: 0,
    name: 'test',
};

describe('GameStore Security', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should detect tampered save data', async () => {
        const store = createGameStore(initialState, {
            storagePrefix: 'security_test',
            enablePersistence: true
        });

        // 1. Save valid state
        store.getState().set({ count: 100, name: 'original' });
        await store.getState().save('slot1');

        // 2. Verify it loads correctly first
        store.getState().reset();
        await store.getState().load('slot1');
        expect(store.getState().data.count).toBe(100);

        // 3. Tamper with the data in localStorage
        const key = 'security_test_slot1';
        const rawData = localStorage.getItem(key);
        expect(rawData).not.toBeNull();

        const parsedData = JSON.parse(rawData!) as SaveData<TestState>;

        // malicious modification: change state but keep checksum same
        parsedData.state.count = 999;
        // We do NOT update parsedData.checksum

        localStorage.setItem(key, JSON.stringify(parsedData));

        // 4. Try to load tampered data
        store.getState().reset();
        const success = await store.getState().load('slot1');

        // 5. Expect load to fail due to checksum mismatch
        expect(success).toBe(false);
        // Should remain as initial state (0), not tampered state (999) or previous state (100) if reset worked
        expect(store.getState().data.count).toBe(0);
    });
});
