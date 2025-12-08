# Active Context

## strata

Procedural 3D graphics library for React Three Fiber.

### Features
- Terrain generation (SDF, marching cubes)
- Water effects (waves, caustics)
- Sky system (day/night cycle, weather)
- Volumetric effects (fog, underwater)
- Vegetation instancing
- Particle systems
- Character animation
- Post-processing effects

### Package Status
- **Registry**: npm (@jbcom/strata)
- **Framework**: React Three Fiber
- **Dependencies**: three, @react-three/fiber, @react-three/drei

### Development
```bash
pnpm install
pnpm run build
pnpm run test
pnpm run format        # Prettier
pnpm run format:check  # Prettier check
```

### Architecture
- `src/core/` - Pure TypeScript algorithms (no React)
- `src/components/` - React Three Fiber components
- `src/shaders/` - GLSL shaders
- `src/presets/` - Ready-to-use configurations

---
*Last updated: 2025-12-06*
