# Beer Finder App - CSS Utility Planning Document

## Overview

This document provides a comprehensive utility-first CSS strategy for the Beer Finder App using Tailwind CSS v4. The planning is based on the wireframes, component tree structure, and design requirements, focusing on mobile-first responsive design, accessibility, and performance optimization.

## 1. Tailwind CSS v4 Configuration Strategy

### Current Setup Analysis
- **Tailwind CSS Version**: v4 (latest with inline theme syntax)
- **PostCSS Integration**: Using `@tailwindcss/postcss` plugin
- **Current Theme**: Basic setup with CSS custom properties
- **Font Stack**: Currently using Arial fallback, needs Inter integration

### Recommended Configuration Approach

#### Base Configuration Structure
```css
/* src/app/globals.css - Enhanced structure */
@import "tailwindcss";

/* Design System Variables */
:root {
  /* Color System */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #2563eb;
  --color-primary-600: #1d4ed8;
  --color-primary-700: #1e40af;
  --color-primary-800: #1e3a8a;
  --color-primary-900: #172554;
  
  /* Amber Accent System */
  --color-accent-50: #fffbeb;
  --color-accent-100: #fef3c7;
  --color-accent-200: #fde68a;
  --color-accent-300: #fcd34d;
  --color-accent-400: #fbbf24;
  --color-accent-500: #f59e0b;
  --color-accent-600: #d97706;
  --color-accent-700: #b45309;
  --color-accent-800: #92400e;
  --color-accent-900: #78350f;
  
  /* Semantic Colors */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
  
  /* Neutral System */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
  --color-gray-950: #030712;
  
  /* Background and Surface Colors */
  --color-background: #ffffff;
  --color-surface: #ffffff;
  --color-surface-elevated: #f9fafb;
  --color-foreground: #111827;
  --color-muted: #6b7280;
  --color-border: #e5e7eb;
  
  /* Typography Scale */
  --font-family-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-family-mono: ui-monospace, SFMono-Regular, 'SF Mono', monospace;
  
  /* Spacing Scale (4px base unit) */
  --spacing-px: 1px;
  --spacing-0-5: 0.125rem; /* 2px */
  --spacing-1: 0.25rem;    /* 4px */
  --spacing-1-5: 0.375rem; /* 6px */
  --spacing-2: 0.5rem;     /* 8px */
  --spacing-2-5: 0.625rem; /* 10px */
  --spacing-3: 0.75rem;    /* 12px */
  --spacing-4: 1rem;       /* 16px */
  --spacing-5: 1.25rem;    /* 20px */
  --spacing-6: 1.5rem;     /* 24px */
  --spacing-8: 2rem;       /* 32px */
  --spacing-10: 2.5rem;    /* 40px */
  --spacing-12: 3rem;      /* 48px */
  --spacing-16: 4rem;      /* 64px */
  --spacing-20: 5rem;      /* 80px */
  --spacing-24: 6rem;      /* 96px */
  
  /* Border Radius Scale */
  --radius-sm: 0.25rem;    /* 4px */
  --radius-md: 0.5rem;     /* 8px */
  --radius-lg: 0.75rem;    /* 12px */
  --radius-xl: 1rem;       /* 16px */
  --radius-2xl: 1.5rem;    /* 24px */
  --radius-full: 9999px;
  
  /* Shadow System */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

/* Dark Mode Variables */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0a0a0a;
    --color-surface: #111827;
    --color-surface-elevated: #1f2937;
    --color-foreground: #f9fafb;
    --color-muted: #9ca3af;
    --color-border: #374151;
  }
}

/* Inline Theme Configuration */
@theme inline {
  /* Colors */
  --color-primary-*: var(--color-primary-*);
  --color-accent-*: var(--color-accent-*);
  --color-gray-*: var(--color-gray-*);
  --color-background: var(--color-background);
  --color-foreground: var(--color-foreground);
  --color-surface: var(--color-surface);
  --color-border: var(--color-border);
  
  /* Typography */
  --font-sans: var(--font-family-sans);
  --font-mono: var(--font-family-mono);
  
  /* Spacing */
  --spacing-*: var(--spacing-*);
  
  /* Border Radius */
  --radius-*: var(--radius-*);
  
  /* Shadows */
  --shadow-*: var(--shadow-*);
}
```

## 2. Design System Utility Classes Mapping

### Color Palette Utilities

#### Primary Color System (Blue #2563EB)
```css
/* Background utilities */
.bg-primary-50    /* #eff6ff - Very light blue backgrounds */
.bg-primary-100   /* #dbeafe - Light blue surfaces */
.bg-primary-500   /* #2563eb - Main brand color */
.bg-primary-600   /* #1d4ed8 - Hover states */
.bg-primary-700   /* #1e40af - Active states */

/* Text utilities */
.text-primary-500  /* Main brand text color */
.text-primary-600  /* Darker text on light backgrounds */
.text-primary-700  /* High contrast text */

/* Border utilities */
.border-primary-500  /* Brand colored borders */
.border-primary-200  /* Subtle brand borders */
```

#### Accent Color System (Amber #F59E0B)
```css
/* Background utilities */
.bg-accent-50     /* #fffbeb - Light amber highlights */
.bg-accent-500    /* #f59e0b - Accent color */
.bg-accent-600    /* #d97706 - Accent hover */

/* Text utilities */
.text-accent-500  /* Amber text for highlights */
.text-accent-600  /* Darker amber text */

/* Border utilities */
.border-accent-500  /* Amber borders for special elements */
```

#### Semantic Color Utilities
```css
/* Success states */
.bg-success      /* #22c55e - Success backgrounds */
.text-success    /* Success text color */
.border-success  /* Success border color */

/* Warning states */
.bg-warning      /* #f59e0b - Warning backgrounds */
.text-warning    /* Warning text color */
.border-warning  /* Warning border color */

/* Error states */
.bg-error        /* #ef4444 - Error backgrounds */
.text-error      /* Error text color */
.border-error    /* Error border color */
```

### Typography System Utilities

#### Font Family
```css
.font-sans       /* Inter font family */
.font-mono       /* Monospace for code/data */
```

#### Font Sizes (8-point scale)
```css
.text-xs         /* 12px - Captions, metadata */
.text-sm         /* 14px - Body text secondary */
.text-base       /* 16px - Body text primary */
.text-lg         /* 18px - Large body text */
.text-xl         /* 20px - Small headings */
.text-2xl        /* 24px - Section headings */
.text-3xl        /* 30px - Page headings */
.text-4xl        /* 36px - Hero headings */
```

#### Font Weights
```css
.font-normal     /* 400 - Regular text */
.font-medium     /* 500 - Emphasis */
.font-semibold   /* 600 - Subheadings */
.font-bold       /* 700 - Headings */
```

### Spacing System Utilities (4px base unit)

#### Padding
```css
.p-1    /* 4px - Minimal padding */
.p-2    /* 8px - Tight padding */
.p-3    /* 12px - Small padding */
.p-4    /* 16px - Standard padding */
.p-5    /* 20px - Medium padding */
.p-6    /* 24px - Large padding */
.p-8    /* 32px - Extra large padding */
```

#### Margins
```css
.m-1    /* 4px - Minimal margin */
.m-2    /* 8px - Tight margin */
.m-3    /* 12px - Small margin */
.m-4    /* 16px - Standard margin */
.m-6    /* 24px - Large margin */
.m-8    /* 32px - Extra large margin */
```

#### Gap for Grid/Flex
```css
.gap-2   /* 8px - Tight spacing */
.gap-4   /* 16px - Standard spacing */
.gap-6   /* 24px - Comfortable spacing */
.gap-8   /* 32px - Loose spacing */
```

## 3. Component-Specific Utility Class Patterns

### Header Component Utilities

#### Mobile Header (< 768px)
```css
/* Container */
.header-mobile {
  @apply h-16 px-4 flex items-center justify-between bg-surface border-b border-border;
}

/* Hamburger menu button */
.header-menu-btn {
  @apply w-11 h-11 flex items-center justify-center rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500;
}

/* Logo/title */
.header-logo {
  @apply text-lg font-bold text-foreground;
}

/* Action buttons */
.header-action {
  @apply w-11 h-11 flex items-center justify-center rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500;
}
```

#### Desktop Header (≥ 768px)
```css
/* Container */
.header-desktop {
  @apply h-18 px-6 lg:px-8 flex items-center justify-between bg-surface border-b border-border;
}

/* Navigation */
.header-nav {
  @apply hidden md:flex items-center space-x-8;
}

/* Nav links */
.header-nav-link {
  @apply text-sm font-medium text-muted hover:text-foreground transition-colors;
}
```

### Search Bar Component Utilities

#### Mobile Search Bar
```css
.search-mobile {
  @apply w-full h-12 px-4 bg-surface border border-border rounded-lg flex items-center gap-3 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500;
}

.search-input-mobile {
  @apply flex-1 bg-transparent border-none outline-none text-base placeholder:text-muted;
}

.search-icon {
  @apply w-5 h-5 text-muted;
}

.search-clear-btn {
  @apply w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-muted;
}
```

#### Desktop Search Bar
```css
.search-desktop {
  @apply w-full max-w-2xl h-14 px-6 bg-surface border border-border rounded-xl flex items-center gap-4 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 shadow-sm;
}

.search-input-desktop {
  @apply flex-1 bg-transparent border-none outline-none text-lg placeholder:text-muted;
}

.search-btn-desktop {
  @apply px-6 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors;
}
```

### Brewery Card Component Utilities

#### Mobile Brewery Card (320px-767px)
```css
.brewery-card-mobile {
  @apply w-full bg-surface border border-border rounded-xl p-4 space-y-3 shadow-sm hover:shadow-md transition-shadow;
}

.brewery-card-header {
  @apply flex items-start gap-3;
}

.brewery-card-image {
  @apply w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden;
}

.brewery-card-content {
  @apply flex-1 min-w-0;
}

.brewery-card-name {
  @apply text-base font-semibold text-foreground truncate;
}

.brewery-card-meta {
  @apply text-sm text-muted;
}

.brewery-card-random-beer {
  @apply bg-gray-50 rounded-lg p-3 flex items-center gap-3;
}

.brewery-card-beer-image {
  @apply w-10 h-10 rounded bg-gray-100 flex-shrink-0;
}

.brewery-card-beer-info {
  @apply flex-1 min-w-0;
}

.brewery-card-beer-name {
  @apply text-sm font-medium text-foreground truncate;
}

.brewery-card-beer-abv {
  @apply text-xs text-muted;
}

.brewery-card-actions {
  @apply flex items-center gap-2;
}

.brewery-card-action-btn {
  @apply w-10 h-10 flex items-center justify-center rounded-lg border border-border hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors;
}
```

#### Desktop Brewery Card (≥768px)
```css
.brewery-card-desktop {
  @apply bg-surface border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 group;
}

.brewery-card-image-desktop {
  @apply w-full h-48 bg-gray-100 overflow-hidden;
}

.brewery-card-content-desktop {
  @apply p-6 space-y-4;
}

.brewery-card-name-desktop {
  @apply text-lg font-semibold text-foreground group-hover:text-primary-500 transition-colors;
}

.brewery-card-random-beer-desktop {
  @apply bg-gray-50 rounded-lg p-4 flex items-center gap-4;
}

.brewery-card-actions-desktop {
  @apply flex items-center justify-between;
}
```

### Filter Panel Component Utilities

#### Mobile Filter Modal
```css
.filter-modal-overlay {
  @apply fixed inset-0 bg-black/50 z-50 flex items-end;
}

.filter-modal-panel {
  @apply w-full bg-surface rounded-t-2xl max-h-[90vh] overflow-hidden;
}

.filter-modal-header {
  @apply flex items-center justify-between p-4 border-b border-border;
}

.filter-modal-title {
  @apply text-lg font-semibold text-foreground;
}

.filter-modal-close {
  @apply w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500;
}

.filter-modal-content {
  @apply flex-1 overflow-y-auto p-4 space-y-6;
}

.filter-modal-actions {
  @apply p-4 border-t border-border bg-surface-elevated flex gap-3;
}
```

#### Desktop Filter Sidebar
```css
.filter-sidebar {
  @apply w-80 bg-surface border-r border-border p-6 space-y-6 overflow-y-auto;
}

.filter-section {
  @apply space-y-3;
}

.filter-section-title {
  @apply text-sm font-semibold text-foreground uppercase tracking-wide;
}

.filter-option {
  @apply flex items-center gap-3 py-2;
}

.filter-checkbox {
  @apply w-4 h-4 rounded border-2 border-gray-300 text-primary-500 focus:ring-primary-500;
}

.filter-label {
  @apply text-sm text-foreground;
}

.filter-count {
  @apply text-xs text-muted ml-auto;
}
```

### Modal Component Utilities

#### Mobile Modal (Full Screen)
```css
.modal-mobile-overlay {
  @apply fixed inset-0 bg-black/75 z-50;
}

.modal-mobile-container {
  @apply fixed inset-0 bg-surface overflow-y-auto;
}

.modal-mobile-header {
  @apply sticky top-0 bg-surface border-b border-border p-4 flex items-center justify-between z-10;
}

.modal-mobile-content {
  @apply p-4;
}

.modal-mobile-actions {
  @apply sticky bottom-0 bg-surface-elevated border-t border-border p-4;
}
```

#### Desktop Modal (Centered)
```css
.modal-desktop-overlay {
  @apply fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4;
}

.modal-desktop-container {
  @apply w-full max-w-4xl max-h-[90vh] bg-surface rounded-2xl shadow-2xl overflow-hidden;
}

.modal-desktop-header {
  @apply p-6 border-b border-border flex items-center justify-between;
}

.modal-desktop-content {
  @apply p-6 overflow-y-auto flex-1;
}

.modal-desktop-actions {
  @apply p-6 border-t border-border bg-surface-elevated flex justify-end gap-3;
}
```

## 4. Responsive Design Utility Strategies

### Breakpoint System
```css
/* Mobile First Approach */
/* Base: 320px+ (mobile) */
/* sm: 640px+ (large mobile) */
/* md: 768px+ (tablet) */
/* lg: 1024px+ (desktop) */
/* xl: 1280px+ (large desktop) */
/* 2xl: 1536px+ (extra large) */
```

### Grid System Utilities

#### Brewery Grid Responsive Patterns
```css
/* Mobile: Single column */
.brewery-grid-mobile {
  @apply grid grid-cols-1 gap-4;
}

/* Tablet: Two columns */
.brewery-grid-tablet {
  @apply md:grid-cols-2 md:gap-6;
}

/* Desktop: Three to four columns */
.brewery-grid-desktop {
  @apply lg:grid-cols-3 xl:grid-cols-4 lg:gap-8;
}

/* Combined responsive grid */
.brewery-grid-responsive {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8;
}
```

#### Container Utilities
```css
/* Page containers */
.container-page {
  @apply w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Content containers */
.container-content {
  @apply w-full max-w-4xl mx-auto px-4 sm:px-6;
}

/* Narrow containers (forms, etc.) */
.container-narrow {
  @apply w-full max-w-md mx-auto px-4;
}
```

### Layout Utilities

#### Flexbox Patterns
```css
/* Header layout */
.layout-header {
  @apply flex items-center justify-between;
}

/* Card content layout */
.layout-card-content {
  @apply flex flex-col space-y-3 md:space-y-4;
}

/* Action button groups */
.layout-actions {
  @apply flex items-center gap-2 md:gap-3;
}

/* Center content */
.layout-center {
  @apply flex items-center justify-center;
}
```

#### Stack Layouts
```css
/* Vertical stacking */
.stack-y {
  @apply flex flex-col space-y-4;
}

.stack-y-tight {
  @apply flex flex-col space-y-2;
}

.stack-y-loose {
  @apply flex flex-col space-y-6 md:space-y-8;
}

/* Horizontal stacking */
.stack-x {
  @apply flex items-center space-x-4;
}

.stack-x-tight {
  @apply flex items-center space-x-2;
}
```

## 5. Custom Utility Class Definitions

### Touch-Friendly Sizing Utilities (44px+ targets)

```css
/* Minimum touch target utilities */
.touch-target-sm {
  @apply min-w-[44px] min-h-[44px];
}

.touch-target-md {
  @apply min-w-[48px] min-h-[48px];
}

.touch-target-lg {
  @apply min-w-[56px] min-h-[56px];
}

/* Touch-friendly button base */
.btn-touch {
  @apply touch-target-sm flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2;
}
```

### Interactive State Utilities

```css
/* Button states */
.btn-primary {
  @apply btn-touch bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus:ring-primary-500;
}

.btn-secondary {
  @apply btn-touch bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 focus:ring-gray-500;
}

.btn-outline {
  @apply btn-touch border border-border bg-surface text-foreground hover:bg-gray-50 active:bg-gray-100 focus:ring-primary-500;
}

.btn-ghost {
  @apply btn-touch bg-transparent text-foreground hover:bg-gray-100 active:bg-gray-200 focus:ring-primary-500;
}

/* Link states */
.link-primary {
  @apply text-primary-500 hover:text-primary-600 underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded;
}

/* Card hover states */
.card-interactive {
  @apply cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200;
}
```

### Random Beer Feature Utilities

```css
/* Random beer section */
.random-beer-section {
  @apply bg-accent-50 border border-accent-200 rounded-lg p-3 md:p-4;
}

/* Beer image container */
.beer-image-container {
  @apply w-10 h-10 md:w-12 md:h-12 rounded bg-accent-100 flex-shrink-0 overflow-hidden;
}

/* ABV display */
.beer-abv {
  @apply inline-flex items-center px-2 py-1 rounded-full bg-accent-500 text-white text-xs font-medium;
}

/* Beer refresh button */
.beer-refresh-btn {
  @apply w-8 h-8 flex items-center justify-center rounded-full bg-accent-100 hover:bg-accent-200 text-accent-600 transition-colors;
}
```

### Favorites System Utilities

```css
/* Favorite toggle button */
.favorite-btn {
  @apply touch-target-sm flex items-center justify-center rounded-lg transition-all duration-200;
}

.favorite-btn-inactive {
  @apply text-gray-400 hover:text-gray-600 hover:bg-gray-100;
}

.favorite-btn-active {
  @apply text-red-500 hover:text-red-600 hover:bg-red-50;
}

/* Favorites count badge */
.favorites-badge {
  @apply absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center;
}

/* Favorites empty state */
.favorites-empty {
  @apply text-center py-16 px-4;
}

.favorites-empty-icon {
  @apply w-16 h-16 mx-auto text-gray-300 mb-4;
}

.favorites-empty-text {
  @apply text-lg font-medium text-gray-900 mb-2;
}

.favorites-empty-description {
  @apply text-gray-500 mb-6;
}
```

## 6. Animation and Interaction Utilities

### Transition Utilities

```css
/* Standard transitions */
.transition-base {
  @apply transition-all duration-200 ease-in-out;
}

.transition-fast {
  @apply transition-all duration-150 ease-out;
}

.transition-slow {
  @apply transition-all duration-300 ease-in-out;
}

/* Specific property transitions */
.transition-colors {
  @apply transition-colors duration-200 ease-in-out;
}

.transition-transform {
  @apply transition-transform duration-200 ease-out;
}

.transition-shadow {
  @apply transition-shadow duration-200 ease-out;
}
```

### Animation Utilities

```css
/* Loading animations */
.animate-spin-slow {
  @apply animate-spin;
  animation-duration: 2s;
}

.animate-pulse-gentle {
  @apply animate-pulse;
  animation-duration: 2s;
}

/* Entrance animations */
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

.animate-scale-in {
  animation: scaleIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

### Hover and Focus Effects

```css
/* Hover lift effect */
.hover-lift {
  @apply hover:-translate-y-1 hover:shadow-lg transition-all duration-200;
}

/* Hover grow effect */
.hover-grow {
  @apply hover:scale-105 transition-transform duration-200;
}

/* Focus ring utilities */
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
}

.focus-ring-inset {
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset;
}

/* Active press effect */
.active-press {
  @apply active:scale-95 transition-transform duration-75;
}
```

## 7. Accessibility Utilities (WCAG 2.1 AA Compliance)

### Screen Reader Utilities

```css
/* Screen reader only content */
.sr-only {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
  clip: rect(0, 0, 0, 0);
}

.focus\:not-sr-only:focus {
  @apply static w-auto h-auto p-0 m-0 overflow-visible whitespace-normal;
  clip: auto;
}

/* Skip navigation link */
.skip-link {
  @apply sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary-600 text-white px-4 py-2 rounded-md z-50 focus-ring;
}
```

### Focus Management Utilities

```css
/* Focus visible utilities */
.focus-visible\:ring-2:focus-visible {
  @apply ring-2 ring-primary-500 ring-offset-2;
}

/* Focus trap container */
.focus-trap {
  @apply relative;
}

/* Keyboard navigation indicators */
.keyboard-nav {
  @apply outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1;
}
```

### High Contrast Mode Support

```css
/* High contrast text */
.text-high-contrast {
  @apply text-gray-900;
}

@media (prefers-contrast: high) {
  .text-high-contrast {
    @apply text-black;
  }
}

/* High contrast borders */
.border-high-contrast {
  @apply border-gray-300;
}

@media (prefers-contrast: high) {
  .border-high-contrast {
    @apply border-gray-900;
  }
}
```

### Motion Preferences

```css
/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .motion-safe\:animate-spin {
    animation: none;
  }
  
  .motion-safe\:transition-all {
    transition: none;
  }
  
  .motion-safe\:hover\:scale-105:hover {
    transform: none;
  }
}

/* Motion-safe utilities */
.motion-safe\:transition {
  @apply transition-all duration-200;
}

@media (prefers-reduced-motion: reduce) {
  .motion-safe\:transition {
    transition: none;
  }
}
```

## 8. Dark Mode Utility Variations

### Dark Mode Color Utilities

```css
/* Dark mode background utilities */
.dark\:bg-surface {
  @apply dark:bg-gray-800;
}

.dark\:bg-surface-elevated {
  @apply dark:bg-gray-700;
}

/* Dark mode text utilities */
.dark\:text-foreground {
  @apply dark:text-gray-100;
}

.dark\:text-muted {
  @apply dark:text-gray-400;
}

/* Dark mode border utilities */
.dark\:border-border {
  @apply dark:border-gray-600;
}
```

### Component Dark Mode Variants

```css
/* Dark mode button variants */
.btn-primary-dark {
  @apply bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700;
}

.btn-secondary-dark {
  @apply bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600;
}

/* Dark mode card styling */
.card-dark {
  @apply bg-surface border border-border dark:bg-gray-800 dark:border-gray-700;
}

/* Dark mode input styling */
.input-dark {
  @apply bg-surface border border-border text-foreground placeholder:text-muted dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400;
}
```

## 9. Performance Optimization Strategies

### Utility Class Organization

#### Critical CSS Utilities (Above the fold)
```css
/* Header and navigation */
.header-* { /* Header utilities */ }
.nav-* { /* Navigation utilities */ }

/* Search bar (primary feature) */
.search-* { /* Search utilities */ }

/* Hero section */
.hero-* { /* Hero utilities */ }

/* Loading states */
.loading-* { /* Loading utilities */ }
```

#### Deferred CSS Utilities (Below the fold)
```css
/* Modal and overlay utilities */
.modal-* { /* Modal utilities */ }
.overlay-* { /* Overlay utilities */ }

/* Advanced filter utilities */
.filter-* { /* Filter utilities */ }

/* Complex animation utilities */
.animate-* { /* Animation utilities */ }
```

### Bundle Size Optimization

#### Essential Utility Groups
1. **Layout**: Flexbox, grid, spacing (highest priority)
2. **Typography**: Font sizes, weights, colors (high priority)
3. **Interactive**: Button states, hover effects (medium priority)
4. **Animation**: Transitions, keyframes (lower priority)

#### Conditional Loading Strategy
```css
/* Base utilities (always loaded) */
@import "utilities/layout.css";
@import "utilities/typography.css";
@import "utilities/colors.css";

/* Feature-specific utilities (conditionally loaded) */
@import "utilities/animations.css" screen and (prefers-reduced-motion: no-preference);
@import "utilities/dark-mode.css" screen and (prefers-color-scheme: dark);
```

### Purge Configuration Strategy

#### Content Patterns for Purging
```javascript
// Tailwind purge configuration
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
  ],
  // Safelist important utilities that might be generated dynamically
  safelist: [
    'grid-cols-1',
    'grid-cols-2', 
    'grid-cols-3',
    'grid-cols-4',
    'animate-spin',
    'animate-pulse',
    // Add other dynamic classes
  ]
}
```

## 10. Component-Specific Implementation Patterns

### Brewery Card Grid Patterns

#### Responsive Grid Implementation
```css
/* Base grid container */
.brewery-grid {
  @apply grid gap-4 md:gap-6 lg:gap-8;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

/* Responsive breakpoint overrides */
@media (min-width: 640px) {
  .brewery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .brewery-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .brewery-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Filter Modal Patterns

#### Mobile Modal Utility Pattern
```css
.filter-modal {
  @apply fixed inset-0 z-50 md:relative md:z-auto md:inset-auto;
  @apply bg-black/50 md:bg-transparent;
  @apply flex items-end md:items-start justify-center md:justify-start;
}

.filter-modal-content {
  @apply w-full md:w-80 max-h-[90vh] md:max-h-full;
  @apply bg-surface md:bg-transparent;
  @apply rounded-t-2xl md:rounded-none;
  @apply overflow-hidden md:overflow-visible;
}
```

## 11. Utility Validation and Testing Strategy

### Accessibility Testing Utilities

```css
/* High contrast testing */
.test-contrast {
  @apply bg-yellow-200 text-black border-2 border-red-500;
}

/* Focus testing */
.test-focus {
  @apply ring-4 ring-purple-500 ring-offset-4;
}

/* Screen reader testing */
.test-sr {
  @apply bg-blue-200 p-2 border border-blue-500;
}
```

### Performance Monitoring Utilities

```css
/* Layout shift prevention */
.prevent-layout-shift {
  @apply min-h-[200px] min-w-[280px];
}

/* Critical resource loading */
.critical-resource {
  @apply animate-pulse bg-gray-200;
}
```

## 12. Implementation Roadmap

### Phase 1: Foundation (Week 1)
1. Set up Tailwind v4 configuration with design tokens
2. Implement typography and color systems
3. Create base component utilities (buttons, inputs)
4. Establish responsive breakpoint patterns

### Phase 2: Components (Week 2)
1. Implement header and navigation utilities
2. Create search bar component utilities
3. Build brewery card utility patterns
4. Develop filter panel utilities

### Phase 3: Features (Week 3)
1. Random beer feature utilities
2. Favorites system utilities
3. Modal and overlay patterns
4. Animation and interaction utilities

### Phase 4: Optimization (Week 4)
1. Dark mode implementation
2. Accessibility compliance validation
3. Performance optimization
4. Cross-browser testing and refinement

This comprehensive utility planning document provides a complete strategy for implementing a design system using Tailwind CSS v4 that addresses all the requirements outlined in the wireframes and component architecture while maintaining optimal performance and accessibility standards.