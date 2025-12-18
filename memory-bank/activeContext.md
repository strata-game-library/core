# Active Context

## strata

Procedural 3D graphics library for React Three Fiber.

### Features

- Terrain generation (SDF, marching cubes)
- Water effects (waves, caustics)
- Sky system (day/night cycle, weather)
- Volumetric effects (fog, underwater)
- Vegetation instancing (with seeded random for reproducibility)
- Particle systems
- Character animation
- Post-processing effects

### Package Status

- **Registry**: npm (@jbcom/strata)
- **Repository**: github.com/jbcom/nodejs-strata
- **Framework**: React Three Fiber
- **Dependencies**: three, @react-three/fiber, @react-three/drei

### Development

```bash
pnpm install
pnpm run build
pnpm run test
pnpm run demo          # Serve demo files
pnpm run format        # Biome format
pnpm run format:check  # Biome format check
```

### Architecture

- `src/core/` - Pure TypeScript algorithms (no React)
- `src/components/` - React Three Fiber components
- `src/shaders/` - GLSL shaders
- `src/presets/` - Ready-to-use configurations
- `examples/` - Working example projects

### Recent Changes (2025-12-18)

- **Migration completed**: All references updated from jbdevprimary/strata to jbcom/nodejs-strata
- **17 PRs merged**: Dependency updates and infrastructure sync
- **Issues addressed**:
  - #7: Fixed Coveralls coverage configuration (reportsDirectory added)
  - #21: Added `demo` script to serve demo files
  - #22: Created examples directory with basic-terrain example
  - #23: Fixed Sphinx docs configuration (project name)
- **GAPS.md updates**:
  - Seeded random implemented (optional seed parameter)
  - Input validation added to instancing functions
  - GPU wind/LOD props documented with JSDoc

---
*Last updated: 2025-12-18*
