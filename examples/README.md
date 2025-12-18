# Strata Examples

This directory contains working example projects demonstrating how to use Strata in real applications.

## Examples

### [basic-terrain](./basic-terrain/)

A simple example showing how to generate terrain using Strata's core functions with React Three Fiber.

**Features demonstrated:**

- Basic terrain generation with SDF
- Marching cubes mesh generation
- Simple lighting setup

## Running Examples

Each example is a standalone project. To run an example:

```bash
cd examples/basic-terrain
pnpm install
pnpm dev
```

## Core-Only Usage

If you want to use Strata's core algorithms without React, see the examples in each project's `src/core-usage.ts` file.

## Contributing Examples

We welcome contributions! Please follow these guidelines:

1. Each example should be self-contained with its own `package.json`
2. Include a README.md explaining what the example demonstrates
3. Keep dependencies minimal
4. Include screenshots or GIFs in the README
