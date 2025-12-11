# Technical Context

## Dependencies

### Runtime Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| three | ^0.160.0 | 3D rendering (peer) |
| @react-three/fiber | ^8.0.0 | React renderer (peer) |
| @react-three/drei | ^9.0.0 | R3F utilities (peer) |
| @dimforge/rapier3d-compat | ^0.19.3 | Physics engine |
| @react-three/rapier | ^2.2.0 | R3F physics bindings |
| howler | ^2.2.4 | Audio |
| zustand | ^4.5.7 | State management |
| xstate | ^5.25.0 | State machines |
| yuka | ^0.7.8 | Game AI |
| miniplex | ^2.0.0 | ECS |
| simplex-noise | ^4.0.3 | Procedural noise |
| postprocessing | ^6.38.0 | Post-processing effects |
| immer | ^10.2.0 | Immutable state |
| lamina | ^1.2.2 | Layered materials |
| leva | ^0.9.36 | Debug UI |

### Dev Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| typescript | ^5.3.0 | Type checking |
| vitest | ^2.1.0 | Unit/integration testing |
| @playwright/test | ^1.40.0 | E2E testing |
| prettier | ^3.2.0 | Code formatting |
| eslint | ^8.56.0 | Linting |
| semantic-release | ^24.2.0 | Versioning |
| husky | ^9.0.0 | Git hooks |

---

## Build Configuration

### TypeScript
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist"
  }
}
```

### Package Exports
```json
{
  ".": "./dist/index.js",
  "./core": "./dist/core/index.js",
  "./components": "./dist/components/index.js",
  "./shaders": "./dist/shaders/index.js",
  "./presets": "./dist/presets/index.js",
  "./utils": "./dist/utils/index.js"
}
```

---

## Platform Support

### Capacitor Plugin (`packages/capacitor-plugin/`)
- Android (Java + Kotlin)
- iOS (Swift)
- Haptics, device info, input handling

### React Native (`packages/react-native/`)
- Device module
- Haptics module
- Input module
- Adapter pattern for platform abstraction

---

## Shader Conventions

```typescript
// Use /* glsl */ for syntax highlighting
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
```

---

## API Design

### Input Validation
```typescript
export function sdSphere(p: Vector3, center: Vector3, radius: number): number {
  if (radius <= 0) throw new Error('sdSphere: radius must be positive');
  return p.clone().sub(center).length() - radius;
}
```

### Resource Disposal
```typescript
useEffect(() => {
  const material = createWaterMaterial();
  return () => {
    material.dispose();
  };
}, []);
```

---

## CI/CD

### GitHub Actions (`.github/workflows/ci.yml`)
1. **build-and-test**: Build + Vitest
2. **release**: semantic-release to npm
3. **docs**: TypeDoc deployment

### Semantic Release
- Conventional commits trigger versioning
- CHANGELOG.md auto-generated
- npm publish on main branch

---

## Environment

### Replit Configuration
```toml
[nix]
channel = "stable-25_05"
packages = ["mesa", "xorg.xorgserver", "xorg.libX11", "xorg.libXext", "mesa-demos", "chromium"]

[[workflows.workflow]]
name = "Strata Docs"
[workflows.workflow.tasks]
task = "shell.exec"
args = "npx serve packages/docs -l 5000"
waitForPort = 5000
```

---

*Last updated: 2025-12-11*

