# System Patterns

## Architecture

### Layered Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    React Components                          │
│  src/components/*.tsx - Thin wrappers, R3F integration      │
├─────────────────────────────────────────────────────────────┤
│                      Presets                                 │
│  src/presets/* - Ready-to-use configurations                │
├─────────────────────────────────────────────────────────────┤
│                    Core Algorithms                           │
│  src/core/* - Pure TypeScript, no React, framework-agnostic │
├─────────────────────────────────────────────────────────────┤
│                      Shaders                                 │
│  src/shaders/* - GLSL with uniform factories                │
└─────────────────────────────────────────────────────────────┘
```

### Key Principles

1. **Core is Framework-Agnostic**
   - `src/core/` contains pure TypeScript
   - No React imports in core
   - Can be used outside R3F

2. **Components are Thin Wrappers**
   - `src/components/` wraps core functions
   - Uses R3F hooks (useFrame, useThree)
   - Handles lifecycle and disposal

3. **Shaders are Extracted**
   - GLSL in template literals with `/* glsl */`
   - Uniform factories in TypeScript
   - Enables shader reuse

4. **Presets are Composable**
   - Pre-configured options
   - Combine multiple systems
   - Easy to customize

---

## Patterns

### Material Factory Pattern
```typescript
// src/core/water.ts
export function createWaterMaterial(options?: WaterMaterialOptions): ShaderMaterial {
  return new ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms: createWaterUniforms(options),
  });
}
```

### Component Wrapper Pattern
```tsx
// src/components/Water.tsx
export function Water({ size, time }: WaterProps) {
  const material = useMemo(() => createWaterMaterial(), []);
  
  useFrame(({ clock }) => {
    material.uniforms.uTime.value = time ?? clock.elapsedTime;
  });
  
  return <mesh material={material}><planeGeometry args={[size, size]} /></mesh>;
}
```

### Preset Composition Pattern
```typescript
// src/presets/fur/index.ts
export function createFurSystem(geometry: BufferGeometry, options?: FurOptions): Group {
  const group = new Group();
  for (let i = 0; i < (options?.layerCount ?? 8); i++) {
    const material = createFurMaterial(i, options?.layerCount ?? 8, options);
    group.add(new Mesh(geometry.clone(), material));
  }
  return group;
}
```

### Uniform Interface Pattern
```typescript
// All uniform interfaces need index signatures for THREE.js
interface WaterUniforms {
  uTime: { value: number };
  uWaterColor: { value: Color };
  [key: string]: { value: unknown }; // Required for THREE.js
}
```

---

## Directory Conventions

| Path | Purpose | React? |
|------|---------|--------|
| `src/core/` | Pure algorithms | No |
| `src/components/` | R3F components | Yes |
| `src/presets/` | Ready-to-use configs | Maybe |
| `src/shaders/` | GLSL code | No |
| `src/utils/` | Utilities | No |
| `src/hooks/` | React hooks | Yes |
| `src/api/` | Public API facades | No |

---

## Commit Conventions

```
feat(terrain): add new biome type     → minor version
fix(water): correct caustic intensity → patch version
refactor(shaders): extract uniforms   → patch version
docs(readme): update examples         → no version
test(core): add SDF tests             → no version
```

---

## Testing Strategy

| Layer | Tool | Location |
|-------|------|----------|
| Unit | Vitest | `tests/unit/` |
| Integration | Vitest + JSDOM | `tests/integration/` |
| E2E | Playwright | `tests/e2e/` |

---

*Last updated: 2025-12-11*

