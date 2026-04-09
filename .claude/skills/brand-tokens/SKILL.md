---
name: allcare-brand
description: Applies AllCare.ai official brand colors, typography, and visual identity to documents, presentations, PDFs, and web artifacts. Use when creating branded materials for AllCare.ai, AllCare Clinic, or AllRx.
---


> **Interaction style:** Use the `AskUserQuestion` tool for all structured questions in this skill. Group related questions together (2-3 per call) rather than asking one at a time.

# AllCare.ai Brand Guidelines

## Overview

Use this skill when creating any branded asset for AllCare.ai and its sub-brands. The design should feel professional, accessible, and calm, appropriate for a healthcare management platform serving seniors.

**Keywords**: AllCare, AllCare.ai, AllCare Clinic, AllRx, healthcare branding, senior care, EMR, brand colors, typography, logo, visual identity

## IMPORTANT: Live Token Sources

All design tokens (colors, typography, spacing, shadows, etc.) live in the `allcare-design` repo. **Do NOT use hardcoded values. Read the source files below for current token values.**

### Primary: tokens.css (read this first)

**File:** `/Users/ramybarsoum/Projects/allcare-repos/allcare-design/src/tokens.css`

Contains the complete token system as CSS custom properties in a single `:root {}` block:

- **Semantic layer** (shadcn-compatible): `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`
- **Brand colors** (5 stops): `--brand-50` through `--brand-700`
- **Status colors** (3-4 stops each): `--success-*`, `--warning-*`, `--error-*`, `--info-*`
- **Gray scale** (10 stops): `--gray-50` through `--gray-900`
- **Typography**: `--font-family`, `--font-size-*`, `--font-weight-*`, `--line-height-*`
- **Spacing** (4px grid): `--space-0` through `--space-16`
- **Shadows**: `--shadow-sm` through `--shadow-xl`, `--focus-ring`, `--focus-ring-error`
- **Icon sizes**: `--icon-xs` through `--icon-xl`, `--icon-stroke`
- **Border widths**: `--border-none`, `--border-1`, `--border-2`
- **Transitions**: `--duration-fast`, `--duration-normal`, `--duration-slow`, `--ease-default`
- **Z-index**: `--z-dropdown` through `--z-tooltip`
- **Component sizes**: `--height-input-sm`, `--height-input-md`, `--height-input-lg`
- **Chart colors**: `--chart-1` through `--chart-5`
- **Border radius**: `--radius` (base value, 0.5rem = 8px)

All colors are in oklch color space with hex equivalents in comments. Use the hex comments for non-CSS contexts (documents, presentations, images).

### Secondary: index.css (for dark mode and Tailwind v4)

**File:** `/Users/ramybarsoum/Projects/allcare-repos/allcare-design/src/index.css`

Read this file when you need:
- **Dark mode overrides**: the `.dark {}` selector block contains all token overrides for dark mode
- **Tailwind v4 integration**: the `@theme inline {}` block maps CSS variables to Tailwind utility classes
- **Sidebar tokens**: `--sidebar-*` variables for sidebar-specific styling

### How to Use These Files

1. **Read `tokens.css`** at the start of any branded work. Parse the `:root {}` block.
2. **Read `index.css`** only when dark mode or Tailwind v4 context is needed. Parse the `.dark {}` block.
3. For CSS/React work: use the CSS custom property names directly (e.g., `var(--brand-500)`)
4. For documents/presentations/images: use the hex values from the comments (e.g., `#125b3f`)
5. For Tailwind classes: use the semantic names (e.g., `bg-primary`, `text-foreground`, `border-border`)

## Logo Assets

Located in the skill's `assets/` directory:

| File | Usage |
|------|-------|
| `logo-color.png` | Primary logo (green on light backgrounds) |
| `logo-white.png` | White logo (for dark/brand backgrounds) |
| `icon.png` | App icon / favicon (script "All" mark) |

### Logo Usage Rules
- Minimum clear space: height of the "A" in "All" on all sides
- Never stretch, rotate, or add effects to the logo
- Use white logo on Brand-500 or darker backgrounds
- Use color logo on white or light gray backgrounds

## Design Rules

These rules apply regardless of token values. They govern how tokens are used.

### Color Rules
- **Never use pure black** (`#000000`) for text. Use Gray-800 or Gray-900.
- **No gradients by design.** Use layered CSS if needed, component-specific.
- **No alpha scales.** Use Tailwind opacity modifiers (e.g., `bg-white/50`).
- **Warning-500 is decorative only.** Use Warning-700 for any text (WCAG AA).
- **Destructive actions**: use Error-500 or Error-600.
- **Links**: Brand-500, hover Brand-600.
- **Disabled**: Gray-400 text, Gray-100 background.

### Spacing Rules
- Strict 4px base grid. No sub-grid (2px, 6px) or irregular spacing.

### Typography Rules
- Minimum text size: 12px.
- H1/H2 get letter-spacing: -0.02em.
- Two icon libraries: Lucide React (primary), Tabler Icons (secondary). Stroke width: 1.5.

## Component Patterns

### Buttons

| Variant | Background | Text | Border |
|---------|------------|------|--------|
| Primary (default) | Brand-500 | White | none |
| Secondary | White | Gray-800 | Gray-300 |
| Destructive | Error-500 | White | none |
| Outline | Transparent | Gray-800 | Gray-200 |
| Ghost | Transparent | Gray-800 | none |
| Link | Transparent | Brand-500 | none |

- Sizes: xs, sm (36px), default (40px), lg (44px), icon variants (square)
- Padding: 16px horizontal
- Radius: lg (8px, from `--radius`)
- Font weight: 500

### Cards
- Background: White
- Border: 1px Gray-200
- Radius: xl (12px)
- Shadow: shadow-sm (shadow-md on hover)
- Padding: 24px
- Subcomponents: CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter

### Inputs
- Height: 40px (sm: 36px, lg: 44px)
- Border: 1px Gray-300
- Radius: lg (8px)
- Focus ring: 2-layer (2px white gap + 4px Brand-500)

### Badges
Variants: default, secondary, destructive, outline, ghost, link

## Responsive Breakpoints

| Token | Value |
|-------|-------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

### Max-Width Containers

| Token | Value |
|-------|-------|
| max-w-paragraph | 720px |
| max-w-container-sm | 640px |
| max-w-container-md | 768px |
| max-w-container-lg | 1024px |
| max-w-container-xl | 1280px |

## Sub-Brand Variations

All sub-brands use the same core palette. Differentiate with:

| Sub-Brand | Context | Accent Usage |
|-----------|---------|--------------|
| **AllCare.ai** | Software/EMR | Brand-500 primary |
| **AllCare Clinic** | Clinical services | Brand-500 + Success colors for health metrics |
| **AllRx** | Pharmacy | Brand-500 + distinct section headers |

## Application Examples

### Documents (DOCX/PDF)
- Header: Brand-500 background, white text, logo-white.png
- Body text: Gray-800
- Headings: Brand-700 or Gray-900
- Footer: Gray-500, 12px

### Presentations (PPTX)
- Title slides: Brand-500 background, white text, logo-white.png centered
- Content slides: White background, logo-color.png top-left
- Accent shapes: Brand-500 or Brand-100

### Web/Mobile (React)
- Use CSS custom properties from the semantic layer
- Primary CTA: Brand-500
- Focus ring: 2-layer (white gap + brand)
- Import tokens: `@import '@allcare/design/tokens.css'` (Tailwind v3) or use `@theme` block (Tailwind v4)
- Use Tailwind preset: `import allcarePreset from '@allcare/design/tailwind-preset'`

## Design Constraints

1. **4px spacing grid only.** No sub-grid (2px, 6px) or irregular values.
2. **5 brand stops, not 10.** Constrains brand usage, prevents scattered usage.
3. **3 semantic stops per status color** (4 for error). Forces deliberate color choices.
4. **No gradients by design.** Use layered CSS if needed, component-specific.
5. **No alpha scales.** Use Tailwind opacity modifiers (e.g., `bg-white/50`).
6. **oklch color space.** Better perceptual uniformity than hex.
7. **2-layer focus ring.** White gap + brand color for accessibility.
8. **Never use pure black** for text. Gray-800 minimum.
9. **Warning-500 is decorative only.** Use Warning-700 for text.
10. **Minimum text size: 12px.**
