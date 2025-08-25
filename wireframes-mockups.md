# Beer Finder App - Wireframes & Mockups

## Project Overview

This document provides comprehensive wireframes and mockups for the Beer Finder App, a mobile-first responsive web application that helps users discover breweries using the Open Brewery DB API. The design focuses on intuitive brewery discovery, efficient search and filtering, and a seamless user experience across all devices.

## Design Principles

### Mobile-First Approach
- All designs start with mobile viewport (320px) and scale up
- Touch-friendly interactions with minimum 44px target sizes
- Content prioritization for smaller screens
- Progressive enhancement for larger viewports

### User-Centered Design
- Clear visual hierarchy for brewery discovery
- Intuitive search and filtering workflow
- Efficient information display in brewery cards
- Seamless navigation between search and details

### Accessibility First
- WCAG 2.1 AA compliance
- High contrast ratios (4.5:1 minimum)
- Keyboard navigation support
- Screen reader compatibility
- Clear focus indicators

## 1. Mobile Wireframes (320px - 767px)

### 1.1 Homepage - Mobile

```
┌─────────────────────────────────┐
│ [☰] BEER FINDER      [❤] [🌙] │ ← Header (64px)
├─────────────────────────────────┤
│                                 │
│        🍺 Beer Finder          │ ← Hero Section
│    Discover amazing breweries   │   (240px)
│         near you                │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 🔍 Search breweries...     │ │ ← Search Bar
│ └─────────────────────────────┘ │   (48px)
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 📍 Current Location: Dublin │ │ ← Location Filter
│ └─────────────────────────────┘ │   (48px)
│                                 │
├─────────────────────────────────┤
│           Quick Actions          │ ← Quick Actions
│                                 │   (120px)
│ ┌──────────┐ ┌──────────────┐   │
│ │ Random   │ │ Near Me      │   │
│ │ Brewery  │ │              │   │
│ │    🎲    │ │     📍       │   │
│ └──────────┘ └──────────────┘   │
├─────────────────────────────────┤
│        Featured Brewery         │ ← Featured Section
│                                 │   (200px)
│ ┌─────────────────────────────┐ │
│ │ [Brewery Image]             │ │
│ │                             │ │
│ │ GUINNESS STOREHOUSE         │ │
│ │ Brewery • Dublin, Ireland   │ │
│ │                             │ │
│ │ Today's featured brewery... │ │
│ │                             │ │
│ │        [View Details]       │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│     Recent Searches (if any)    │ ← Recent Searches
│                                 │   (Variable)
│ • Dublin microbreweries         │
│ • Cork brewpubs                 │
│ • Galway craft beer             │
└─────────────────────────────────┘
```

### 1.2 Search Results - Mobile

```
┌─────────────────────────────────┐
│ [←] Search Results    [❤] [⚙]  │ ← Header with Back
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ 🔍 Dublin breweries        │ │ ← Search Bar
│ └─────────────────────────────┘ │   (48px)
│                                 │
│ ┌─────────────────────────────┐ │ ← Filter Bar
│ │ Filters: All Types [▼] 📍  │ │   (40px)
│ └─────────────────────────────┘ │
│                                 │
│ Found 24 breweries             │ ← Results Count
│                                 │   (24px)
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │ ← Brewery Card
│ │ [🍺] GUINNESS STOREHOUSE    │ │   (140px each)
│ │                             │ │
│ │ Large Brewery               │ │
│ │ Dublin, Ireland             │ │
│ │                             │ │
│ │ Random Beer: Guinness Stout │ │
│ │ [Beer Image] 4.2% ABV      │ │
│ │                             │ │
│ │ [❤] [📍] [View Details]    │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ [🍺] BREW DOG DUBLIN        │ │
│ │                             │ │
│ │ Brewpub                     │ │
│ │ Dublin, Ireland             │ │
│ │                             │ │
│ │ Random Beer: Punk IPA       │ │
│ │ [Beer Image] 5.6% ABV      │ │
│ │                             │ │
│ │ [❤] [📍] [View Details]    │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ [🍺] GALWAY BAY BREWERY     │ │
│ │                             │ │
│ │ Microbrewery                │ │
│ │ Galway, Ireland             │ │
│ │                             │ │
│ │ Random Beer: Bay Ale        │ │
│ │ [Beer Image] 4.8% ABV      │ │
│ │                             │ │
│ │ [❤] [📍] [View Details]    │ │
│ └─────────────────────────────┘ │
│                                 │
│        [Load More]              │ ← Load More Button
└─────────────────────────────────┘
```

### 1.3 Brewery Detail Modal - Mobile

```
┌─────────────────────────────────┐
│ [×]          Details           │ ← Modal Header
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │     [Brewery Hero Image]    │ │ ← Hero Image
│ │                             │ │   (200px)
│ └─────────────────────────────┘ │
│                                 │
│ GUINNESS STOREHOUSE             │ ← Brewery Name
│ Large Brewery                   │   (Typography)
│                                 │
│ ⭐⭐⭐⭐⭐ (4.8) 1,234 reviews  │ ← Rating (if available)
│                                 │
├─────────────────────────────────┤
│ 📍 Address                      │ ← Contact Section
│ St. James's Gate                │
│ Dublin 8, D08 VF8H             │
│ Ireland                         │
│                                 │
│ 📞 Phone                        │
│ +353 1 408 4800                │
│ [Call Now]                      │
│                                 │
│ 🌐 Website                      │
│ guinness-storehouse.com         │
│ [Visit Website]                 │
│                                 │
├─────────────────────────────────┤
│ Random Beer Spotlight           │ ← Random Beer
│                                 │   Section
│ ┌─────────────────────────────┐ │
│ │ [Beer Photo]                │ │
│ │                             │ │
│ │ GUINNESS DRAUGHT            │ │
│ │                             │ │
│ │ 🍺 Stout                    │ │
│ │ 🔥 4.2% ABV                 │ │
│ │                             │ │
│ │ The world's most popular... │ │
│ └─────────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │ ← Action Buttons
│ │        [❤ Add to Favorites] │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │        [📍 Get Directions]  │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │        [📱 Share]           │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

### 1.4 Filter Panel - Mobile

```
┌─────────────────────────────────┐
│ [×] Filters                     │ ← Filter Modal Header
├─────────────────────────────────┤
│ Brewery Type                    │
│                                 │
│ ☐ All Types                     │ ← Checkbox List
│ ☑ Microbrewery                  │
│ ☐ Brewpub                       │
│ ☐ Regional                      │
│ ☐ Large                         │
│ ☐ Nano                          │
│ ☐ Planning                      │
│                                 │
├─────────────────────────────────┤
│ Location                        │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 🔍 Search by city/state...  │ │ ← Location Search
│ └─────────────────────────────┘ │
│                                 │
│ ☑ Dublin                        │
│ ☐ Cork                          │
│ ☐ Galway                        │
│ ☐ Limerick                      │
│                                 │
├─────────────────────────────────┤
│ Distance (if location enabled)  │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ ●────●─────────── 25km      │ │ ← Distance Slider
│ └─────────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│ Sort By                         │
│                                 │
│ ☑ Name (A-Z)                    │ ← Radio Buttons
│ ☐ Distance                      │
│ ☐ Type                          │
│ ☐ City                          │
│                                 │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │        [Clear All]          │ │ ← Filter Actions
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │     [Apply Filters (24)]    │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

### 1.5 Favorites Page - Mobile

```
┌─────────────────────────────────┐
│ [☰] My Favorites      [🔍] [⚙] │ ← Header
├─────────────────────────────────┤
│            My Favorites          │ ← Page Title
│         8 saved breweries       │   (48px)
│                                 │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │ ← Favorite Cards
│ │ [🍺] BREW DOG DUBLIN        │ │   (Same as search
│ │                             │ │    results but with
│ │ Brewpub                     │ │    remove option)
│ │ Dublin, Ireland             │ │
│ │                             │ │
│ │ Random Beer: Punk IPA       │ │
│ │ [Beer Image] 5.6% ABV      │ │
│ │                             │ │
│ │ [💔] [📍] [View Details]   │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ [🍺] GALWAY BAY BREWERY     │ │
│ │                             │ │
│ │ Microbrewery                │ │
│ │ Galway, Ireland             │ │
│ │                             │ │
│ │ Random Beer: Bay Ale        │ │
│ │ [Beer Image] 4.8% ABV      │ │
│ │                             │ │
│ │ [💔] [📍] [View Details]   │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │        [Share Favorites]     │ │ ← Action Button
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │      [Export to Calendar]   │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

## 2. Desktop Wireframes (768px+)

### 2.1 Homepage - Desktop (1024px+)

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ [☰] BEER FINDER                                           [❤ Favorites] [🌙] [Profile] │ ← Header (72px)
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│                            🍺 Discover Amazing Breweries                               │ ← Hero Section
│                          Find your next favorite craft brewery                         │   (400px)
│                                    near you                                            │
│                                                                                         │
│         ┌─────────────────────────────────────────────────────────────────┐           │
│         │ 🔍 Search breweries by name, city, or type...                  │           │ ← Search Bar
│         └─────────────────────────────────────────────────────────────────┘           │   (56px)
│                                                                                         │
│    ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│    │ 📍 Dublin       │  │ 🍺 All Types    │  │ 📏 25km Radius  │  │ [Search]        │ │ ← Quick Filters
│    └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘ │   (48px)
│                                                                                         │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│ Quick Actions                                     │  Featured Brewery of the Day        │ ← Quick Actions +
│                                                   │                                     │   Featured (300px)
│ ┌─────────────────┐  ┌─────────────────────────┐ │ ┌─────────────────────────────────┐ │
│ │ 🎲 Random       │  │ 📍 Breweries Near Me    │ │ │ [Hero Brewery Image]            │ │
│ │ Brewery         │  │                         │ │ │                                 │ │
│ │                 │  │ Get location-based      │ │ │ GUINNESS STOREHOUSE             │ │
│ │ Discover        │  │ recommendations         │ │ │ Large Brewery • Dublin          │ │
│ │ something new   │  │                         │ │ │                                 │ │
│ │                 │  │ [Enable Location]       │ │ │ Ireland's most iconic brewery   │ │
│ │ [Try Random]    │  │                         │ │ │ experience with 7 floors of...  │ │
│ └─────────────────┘  └─────────────────────────┘ │ │                                 │ │
│                                                   │ │ Random Beer: Guinness Draught   │ │
│                                                   │ │ [Beer Image] 4.2% ABV          │ │
│                                                   │ │                                 │ │
│                                                   │ │     [❤] [📍] [View Details]    │ │
│                                                   │ └─────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                   Recent Searches                                       │ ← Recent Searches
│                                                                                         │   (120px)
│        Dublin microbreweries        Cork brewpubs        Galway craft beer             │
│         [Show Results]              [Show Results]         [Show Results]              │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Search Results - Desktop (1024px+)

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ [☰] BEER FINDER                                           [❤ Favorites] [🌙] [Profile] │ ← Header
├─────────────────────────────────────────────────────────────────────────────────────────┤
│         ┌─────────────────────────────────────────────────────────────────┐             │
│         │ 🔍 Dublin breweries                                            │             │ ← Search Bar
│         └─────────────────────────────────────────────────────────────────┘             │
├─────────────────────┬───────────────────────────────────────────────────────────────────┤
│ Filters             │ Search Results                                                    │
│                     │                                                                   │
│ Brewery Type        │ ┌─────────────────────────────────────┐ Found 24 breweries      │
│ ☐ All Types         │ │ Sort: Name (A-Z) [▼] [🗂] [≡]      │ Showing 1-12             │
│ ☑ Microbrewery      │ └─────────────────────────────────────┘                         │
│ ☐ Brewpub           │                                                                   │
│ ☐ Regional          │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ ☐ Large             │ │[🍺 Image]   │ │[🍺 Image]   │ │[🍺 Image]   │ │[🍺 Image]   │ │
│ ☐ Nano              │ │             │ │             │ │             │ │             │ │
│ ☐ Planning          │ │GUINNESS     │ │BREW DOG     │ │GALWAY BAY   │ │THE PORTERHO │ │
│                     │ │STOREHOUSE   │ │DUBLIN       │ │BREWERY      │ │USE          │ │
│ Location            │ │             │ │             │ │             │ │             │ │
│ ┌─────────────────┐ │ │Large Brewery│ │Brewpub      │ │Microbrewery │ │Gastropub    │ │
│ │🔍 Search city.. │ │ │Dublin, IRE  │ │Dublin, IRE  │ │Galway, IRE  │ │Dublin, IRE  │ │
│ └─────────────────┘ │ │             │ │             │ │             │ │             │ │
│                     │ │Random Beer: │ │Random Beer: │ │Random Beer: │ │Random Beer: │ │
│ ☑ Dublin            │ │Guinness     │ │Punk IPA     │ │Bay Ale      │ │Porter House│ │
│ ☐ Cork              │ │Draught      │ │[Beer Photo] │ │[Beer Photo] │ │Stout        │ │
│ ☐ Galway            │ │[Beer Photo] │ │5.6% ABV     │ │4.8% ABV     │ │[Beer Photo] │ │
│ ☐ Limerick          │ │4.2% ABV     │ │             │ │             │ │5.2% ABV     │ │
│                     │ │             │ │             │ │             │ │             │ │
│ Distance            │ │[❤][📍]      │ │[❤][📍]      │ │[❤][📍]      │ │[❤][📍]      │ │
│ ┌─────────────────┐ │ │[View Details│ │[View Details│ │[View Details│ │[View Details│ │
│ │●────● 25km     │ │ │             │ │             │ │             │ │             │ │
│ └─────────────────┘ │ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
│                     │                                                                   │
│ Sort By             │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ ☑ Name (A-Z)        │ │[🍺 Image]   │ │[🍺 Image]   │ │[🍺 Image]   │ │[🍺 Image]   │ │
│ ☐ Distance          │ │             │ │             │ │             │ │             │ │
│ ☐ Type              │ │[Brewery     │ │[Brewery     │ │[Brewery     │ │[Brewery     │ │
│ ☐ City              │ │ Cards...]   │ │ Cards...]   │ │ Cards...]   │ │ Cards...]   │ │
│                     │ │             │ │             │ │             │ │             │ │
│ ┌─────────────────┐ │ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
│ │   [Clear All]   │ │                                                                   │
│ └─────────────────┘ │                              [Load More]                          │
│                     │                                                                   │
│ ┌─────────────────┐ │                         [1] [2] [3] ... [Next]                  │
│ │ [Apply Filters] │ │                                                                   │
│ └─────────────────┘ │                                                                   │
└─────────────────────┴───────────────────────────────────────────────────────────────────┘
```

### 2.3 Brewery Detail Page - Desktop (1024px+)

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ [☰] BEER FINDER                                           [❤ Favorites] [🌙] [Profile] │ ← Header
├─────────────────────────────────────────────────────────────────────────────────────────┤
│ [← Back to Results]                                               [Share] [❤ Favorite] │ ← Navigation
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                            [Brewery Hero Image - Full Width]                            │ ← Hero Image
│                                     (400px height)                                     │   (400px)
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│                              GUINNESS STOREHOUSE                                       │ ← Brewery Header
│                           Large Brewery • Dublin, Ireland                              │   (120px)
│                          ⭐⭐⭐⭐⭐ (4.8) • 1,234 reviews                             │
│                                                                                         │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                     │                                    │                             │
│ Contact Information │        Random Beer Spotlight      │       Quick Actions         │ ← Main Content
│                     │                                    │                             │   (600px)
│ 📍 Address          │ ┌────────────────────────────────┐ │ ┌─────────────────────────┐ │
│ St. James's Gate    │ │        [Beer Hero Image]       │ │ │     [❤ Add to Fav]      │ │
│ Dublin 8, D08 VF8H  │ │                                │ │ └─────────────────────────┘ │
│ Ireland             │ │      GUINNESS DRAUGHT          │ │                             │
│                     │ │                                │ │ ┌─────────────────────────┐ │
│ 📞 Phone            │ │ 🍺 Stout • 🔥 4.2% ABV        │ │ │   [📍 Get Directions]   │ │
│ +353 1 408 4800     │ │                                │ │ └─────────────────────────┘ │
│ [Call Now]          │ │ The world's most famous stout  │ │                             │
│                     │ │ with its distinctive taste and │ │ ┌─────────────────────────┐ │
│ 🌐 Website          │ │ creamy head. Brewed with Irish │ │ │      [🌐 Visit Site]    │ │
│ guinness-store...   │ │ barley and traditional methods │ │ └─────────────────────────┘ │
│ [Visit Website]     │ │ since 1759.                    │ │                             │
│                     │ │                                │ │ ┌─────────────────────────┐ │
│ 🕒 Hours            │ │ [🍺 More Beer Info] [📱 Share] │ │ │       [📱 Share]        │ │
│ Mon-Sun: 9:30-17:00 │ └────────────────────────────────┘ │ └─────────────────────────┘ │
│                     │                                    │                             │
│ 💰 Price Range      │                                    │ ┌─────────────────────────┐ │
│ €€€                 │                                    │ │   [🗓 Plan Visit]       │ │
│                     │                                    │ └─────────────────────────┘ │
├─────────────────────┴────────────────────────────────────┴─────────────────────────────┤
│                              Related Breweries Nearby                                  │ ← Related Section
│                                                                                         │   (200px)
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────│
│ │[Brewery]    │ │[Brewery]    │ │[Brewery]    │ │[Brewery]    │ │[Brewery]    │ │[...│
│ │Card         │ │Card         │ │Card         │ │Card         │ │Card         │ │    │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ └────│
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

## 3. Responsive Breakpoints

### Breakpoint Strategy

| Breakpoint | Width Range | Layout Changes |
|------------|-------------|----------------|
| **Mobile** | 320px - 767px | Single column, stacked layout, mobile navigation |
| **Tablet** | 768px - 1023px | Two-column grid, sidebar filters, larger touch targets |
| **Desktop** | 1024px - 1439px | Multi-column grid, sidebar + main content, hover states |
| **Large Desktop** | 1440px+ | Maximum content width, more cards per row |

### Layout Adaptations

#### Mobile to Tablet (768px)
- Grid changes from 1 column to 2 columns
- Filter panel becomes sidebar instead of modal
- Search bar expands to full width
- Brewery cards grow larger with more content

#### Tablet to Desktop (1024px)
- Grid changes from 2 columns to 3-4 columns
- Full sidebar for filters always visible
- Hero section gets more prominent
- Hover effects and animations enabled
- Navigation becomes horizontal

#### Desktop to Large (1440px)
- Maximum content width constraint (1200px)
- 4+ column grid for brewery cards
- More whitespace and breathing room
- Enhanced imagery and visual elements

## 4. Component Layout Specifications

### 4.1 Header Component

#### Mobile Header (< 768px)
```
Height: 64px
├── Hamburger Menu (44px × 44px)
├── Logo/Title (flexible width)
└── Actions (44px × 44px each)
    ├── Favorites Icon
    └── Theme Toggle
```

#### Desktop Header (≥ 768px)
```
Height: 72px
├── Logo/Title (200px)
├── Navigation Menu (flexible)
└── Actions (48px × 48px each)
    ├── Favorites (with count)
    ├── Theme Toggle
    └── User Profile
```

### 4.2 Search Bar Component

#### Mobile Search Bar
```
Height: 48px
├── Search Icon (20px)
├── Input Field (flexible)
└── Clear Button (optional, 20px)

Padding: 12px horizontal
Border: 2px solid
Border Radius: 8px
```

#### Desktop Search Bar
```
Height: 56px
├── Search Icon (24px)
├── Input Field (flexible)
├── Suggestions Dropdown
└── Search Button (120px)

Padding: 16px horizontal
Border: 2px solid
Border Radius: 12px
```

### 4.3 Brewery Card Component

#### Mobile Brewery Card
```
Width: 100% (minus 16px margins)
Height: 140px
├── Brewery Image (64px × 64px)
├── Content Area
│   ├── Name (1 line, truncated)
│   ├── Type & Location (1 line)
│   ├── Random Beer Section (50px)
│   └── Actions Row (32px)
└── Favorite Button (absolute positioned)

Padding: 16px
Border Radius: 12px
Shadow: soft
```

#### Desktop Brewery Card
```
Width: Variable (grid-based)
Height: 240px
├── Brewery Image (100% width, 120px height)
├── Content Area (120px)
│   ├── Name (2 lines max)
│   ├── Type & Location
│   ├── Random Beer Section (60px)
│   └── Actions Row (40px)

Padding: 20px
Border Radius: 16px
Shadow: medium on hover
```

### 4.4 Filter Panel Component

#### Mobile Filter Panel (Modal)
```
Full Screen Overlay
├── Header (64px)
│   ├── Close Button
│   └── Title
├── Filter Content (scrollable)
│   ├── Section Headers (40px each)
│   ├── Filter Options (44px touch targets)
│   └── Range Sliders (60px)
└── Action Buttons (120px)
    ├── Clear All (56px height)
    └── Apply Filters (56px height)
```

#### Desktop Filter Panel (Sidebar)
```
Width: 280px
├── Filter Sections
│   ├── Section Headers (32px)
│   ├── Filter Options (36px targets)
│   └── Range Sliders (48px)
└── Action Buttons (80px)
    ├── Clear All (40px height)
    └── Apply Filters (40px height)

Sticky positioning
```

### 4.5 Modal Component

#### Mobile Modal
```
Full Screen
├── Header (64px)
├── Content (scrollable)
└── Actions (80px)

Background: overlay
Animation: slide-up
```

#### Desktop Modal
```
Max Width: 800px
├── Header (72px)
├── Content (max-height with scroll)
└── Actions (88px)

Background: centered overlay
Animation: fade-in + scale
Border Radius: 16px
```

## 5. User Interaction Flows

### 5.1 Primary Search Flow

```
1. User arrives at homepage
   ↓
2. User sees search bar prominently displayed
   ↓
3. User types in search query
   ├── Autocomplete suggestions appear (if enabled)
   └── Search button becomes active
   ↓
4. User submits search
   ├── Loading state shows
   └── URL updates with search parameters
   ↓
5. Search results page loads
   ├── Search query preserved in input
   ├── Results count displayed
   └── Filter options available
   ↓
6. User can:
   ├── Refine search with filters
   ├── Sort results
   ├── Click on brewery card for details
   └── Add breweries to favorites
```

### 5.2 Discovery Flow (Random Brewery)

```
1. User clicks "Random Brewery" on homepage
   ↓
2. Loading indicator shows briefly
   ↓
3. Random brewery loads with:
   ├── Brewery information
   ├── Random beer spotlight
   └── Action buttons
   ↓
4. User can:
   ├── Get another random brewery
   ├── View full brewery details
   ├── Add to favorites
   └── Share discovery
```

### 5.3 Filter Application Flow

```
1. User opens filter panel
   ├── Mobile: Modal overlay
   └── Desktop: Sidebar already visible
   ↓
2. User selects filter options
   ├── Brewery types (multi-select)
   ├── Location (search + select)
   ├── Distance (slider)
   └── Sort preference (radio)
   ↓
3. Filter count updates in real-time
   ↓
4. User applies filters
   ├── Modal closes (mobile)
   ├── Results update
   └── URL parameters update
   ↓
5. User can:
   ├── Clear individual filters
   ├── Clear all filters
   └── Refine further
```

### 5.4 Brewery Detail Flow

```
1. User clicks "View Details" on brewery card
   ↓
2. Detail view opens:
   ├── Mobile: Full page navigation
   └── Desktop: Modal or new page
   ↓
3. User sees:
   ├── Brewery hero image
   ├── Complete contact information
   ├── Random beer spotlight
   └── Action buttons
   ↓
4. User can:
   ├── Add to favorites
   ├── Get directions
   ├── Visit website
   ├── Call brewery
   └── Share brewery
```

### 5.5 Favorites Management Flow

```
1. User adds brewery to favorites
   ├── Heart icon fills/animates
   ├── Confirmation feedback
   └── Favorites count updates
   ↓
2. User accesses favorites page
   ├── Navigation from header
   └── See all saved breweries
   ↓
3. User can:
   ├── Remove from favorites
   ├── Reorder favorites
   ├── Share favorite list
   └── Export to calendar
```

## 6. Visual Hierarchy and Spacing Guidelines

### 6.1 Typography Hierarchy

#### Primary Hierarchy
```
H1 (Page Titles): 32px/36px (mobile), 48px/52px (desktop)
H2 (Section Headers): 24px/28px (mobile), 32px/36px (desktop)
H3 (Brewery Names): 20px/24px (mobile), 24px/28px (desktop)
H4 (Sub-headers): 18px/22px (mobile), 20px/24px (desktop)
Body Text: 16px/24px (mobile), 16px/24px (desktop)
Small Text: 14px/20px (mobile), 14px/20px (desktop)
Caption Text: 12px/16px (mobile), 12px/16px (desktop)
```

#### Font Weights
```
Display/Headlines: 700 (Bold)
Headings: 600 (Semi-bold)
Subheadings: 500 (Medium)
Body Text: 400 (Regular)
Secondary Text: 400 (Regular)
```

### 6.2 Spacing System

#### Base Spacing Unit: 4px

#### Spacing Scale
```
XS: 4px (0.25rem)
SM: 8px (0.5rem)
MD: 16px (1rem)
LG: 24px (1.5rem)
XL: 32px (2rem)
2XL: 48px (3rem)
3XL: 64px (4rem)
4XL: 96px (6rem)
```

#### Component Spacing
```
Card Padding: 16px (mobile), 20px (desktop)
Button Padding: 12px × 24px (mobile), 16px × 32px (desktop)
Input Padding: 12px (mobile), 16px (desktop)
Section Margins: 24px (mobile), 48px (desktop)
Grid Gaps: 16px (mobile), 24px (desktop)
```

### 6.3 Visual Weight Distribution

#### Information Hierarchy (Brewery Cards)
```
1. Brewery Name (Highest priority)
   - Largest text size
   - Bold weight
   - High contrast color

2. Random Beer Information (High priority)
   - Prominent image
   - Clear beer name
   - ABV percentage highlighted

3. Brewery Type & Location (Medium priority)
   - Secondary text styling
   - Consistent formatting

4. Action Buttons (Medium priority)
   - Clear visual separation
   - Adequate touch targets
   - Consistent styling

5. Supporting Elements (Low priority)
   - Distance (if available)
   - Additional metadata
```

### 6.4 Color Distribution

#### Primary Colors (High attention)
- Call-to-action buttons
- Active states
- Important notifications
- Brewery names

#### Secondary Colors (Medium attention)
- Navigation elements
- Filter indicators
- Beer information
- Secondary actions

#### Neutral Colors (Low attention)
- Background elements
- Supporting text
- Borders and dividers
- Disabled states

## 7. Accessibility Considerations

### 7.1 Color and Contrast

#### Contrast Requirements
```
Normal Text: 4.5:1 minimum ratio
Large Text (18px+): 3:1 minimum ratio
UI Elements: 3:1 minimum ratio
Graphics: 3:1 minimum ratio (when meaningful)
```

#### Color Independence
- Never rely on color alone to convey information
- Use icons, text labels, and patterns alongside color
- Provide alternative indicators for state changes
- Test with color blindness simulators

### 7.2 Keyboard Navigation

#### Tab Order
```
1. Skip navigation link
2. Header navigation
3. Search bar
4. Filter controls
5. Brewery cards (in reading order)
6. Pagination controls
7. Footer links
```

#### Keyboard Shortcuts
```
Tab: Move to next focusable element
Shift + Tab: Move to previous focusable element
Enter: Activate buttons and links
Space: Activate buttons, check checkboxes
Escape: Close modals and dropdowns
Arrow keys: Navigate within component groups
```

#### Focus Management
- Visible focus indicators on all interactive elements
- Focus trapping in modals
- Focus restoration when modals close
- Logical tab order throughout the application

### 7.3 Screen Reader Support

#### Semantic HTML
```
<header> - Site header with navigation
<main> - Primary content area
<section> - Distinct sections of content
<article> - Brewery cards and details
<aside> - Filter panel and secondary content
<nav> - Navigation menus
<form> - Search and filter forms
```

#### ARIA Labels and Descriptions
```
aria-label: Descriptive labels for buttons and icons
aria-describedby: Link to helper text and descriptions
aria-expanded: State of dropdowns and collapsible content
aria-current: Current page in navigation
role="alert": Important status messages
role="region": Significant sections with labels
```

#### Alternative Text
```
Brewery Images: "Logo of [Brewery Name]" or descriptive content
Beer Images: "[Beer Name] bottle/can" or style description
Decorative Images: Empty alt="" attribute
Complex Graphics: Detailed description or data table alternative
```

### 7.4 Touch and Motor Accessibility

#### Touch Target Sizes
```
Minimum: 44px × 44px (iOS) / 48dp × 48dp (Android)
Preferred: 48px × 48px minimum
Spacing: 8px minimum between adjacent touch targets
```

#### Motor Accessibility
- Large click areas for links and buttons
- Sufficient spacing between interactive elements
- Support for assistive technologies
- No time-based interactions required
- Alternative input methods supported

### 7.5 Cognitive Accessibility

#### Content Clarity
- Clear, concise headings and labels
- Consistent navigation and layout patterns
- Error messages that explain how to fix issues
- Progress indicators for multi-step processes

#### User Control
- Ability to pause/stop animations
- Undo functionality for destructive actions
- Save progress in forms and searches
- Clear exit points from all flows

## 8. Color and Typography Recommendations

### 8.1 Color Palette

#### Primary Brand Colors
```
Primary Blue: #2563EB (rgb(37, 99, 235))
├── Light: #DBEAFE (rgb(219, 234, 254))
├── Dark: #1E40AF (rgb(30, 64, 175))
└── Text: #FFFFFF (on primary backgrounds)

Used for: Main CTAs, active states, links, brand elements
```

#### Secondary Colors
```
Amber/Gold: #F59E0B (rgb(245, 158, 11))
├── Light: #FEF3C7 (rgb(254, 243, 199))
├── Dark: #D97706 (rgb(217, 119, 6))
└── Text: #92400E (rgb(146, 64, 14))

Used for: Beer-related elements, highlights, warnings
```

#### Semantic Colors
```
Success Green: #10B981 (rgb(16, 185, 129))
├── Light: #D1FAE5 (rgb(209, 250, 229))
├── Dark: #059669 (rgb(5, 150, 105))
└── Background: #ECFDF5 (rgb(236, 253, 245))

Warning Orange: #F59E0B (rgb(245, 158, 11))
├── Light: #FEF3C7 (rgb(254, 243, 199))
├── Dark: #D97706 (rgb(217, 119, 6))
└── Background: #FFFBEB (rgb(255, 251, 235))

Error Red: #EF4444 (rgb(239, 68, 68))
├── Light: #FECACA (rgb(254, 202, 202))
├── Dark: #DC2626 (rgb(220, 38, 38))
└── Background: #FEF2F2 (rgb(254, 242, 242))
```

#### Neutral Colors
```
Gray Scale:
├── Gray 50: #F9FAFB (rgb(249, 250, 251)) - Light backgrounds
├── Gray 100: #F3F4F6 (rgb(243, 244, 246)) - Card backgrounds
├── Gray 200: #E5E7EB (rgb(229, 231, 235)) - Borders
├── Gray 300: #D1D5DB (rgb(209, 213, 219)) - Disabled elements
├── Gray 400: #9CA3AF (rgb(156, 163, 175)) - Placeholders
├── Gray 500: #6B7280 (rgb(107, 114, 128)) - Secondary text
├── Gray 600: #4B5563 (rgb(75, 85, 99)) - Body text
├── Gray 700: #374151 (rgb(55, 65, 81)) - Headings
├── Gray 800: #1F2937 (rgb(31, 41, 55)) - Dark text
└── Gray 900: #111827 (rgb(17, 24, 39)) - Primary text
```

### 8.2 Typography System

#### Font Selection
```
Primary Font: Inter
├── Fallback: ui-sans-serif, system-ui, sans-serif
├── Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
└── Features: Variable font, excellent readability, web-optimized

Secondary Font: System UI Stack
├── Fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto
└── Use: When Inter unavailable or for performance-critical sections
```

#### Type Scale
```
Display (Hero Headings):
├── Mobile: 36px / 40px (2.25rem / 2.5rem)
├── Desktop: 60px / 64px (3.75rem / 4rem)
└── Weight: 700 (Bold)

Heading 1 (Page Titles):
├── Mobile: 30px / 36px (1.875rem / 2.25rem)
├── Desktop: 48px / 52px (3rem / 3.25rem)
└── Weight: 700 (Bold)

Heading 2 (Section Headers):
├── Mobile: 24px / 32px (1.5rem / 2rem)
├── Desktop: 36px / 40px (2.25rem / 2.5rem)
└── Weight: 600 (Semibold)

Heading 3 (Subsection Headers):
├── Mobile: 20px / 28px (1.25rem / 1.75rem)
├── Desktop: 30px / 36px (1.875rem / 2.25rem)
└── Weight: 600 (Semibold)

Heading 4 (Component Headers):
├── Mobile: 18px / 24px (1.125rem / 1.5rem)
├── Desktop: 24px / 32px (1.5rem / 2rem)
└── Weight: 600 (Semibold)

Body Large:
├── Size: 18px / 28px (1.125rem / 1.75rem)
├── Weight: 400 (Regular)
└── Use: Important body text, intro paragraphs

Body Regular:
├── Size: 16px / 24px (1rem / 1.5rem)
├── Weight: 400 (Regular)
└── Use: Standard body text, descriptions

Body Small:
├── Size: 14px / 20px (0.875rem / 1.25rem)
├── Weight: 400 (Regular)
└── Use: Secondary text, captions, metadata

Caption:
├── Size: 12px / 16px (0.75rem / 1rem)
├── Weight: 400 (Regular)
└── Use: Labels, timestamps, fine print
```

#### Typography Usage Guidelines

##### Brewery Names
```
Font: Inter Semibold (600)
Size: 20px mobile / 24px desktop
Color: Gray 800 (#374151)
Line Height: 1.2
Letter Spacing: -0.01em
```

##### Beer Names
```
Font: Inter Medium (500)
Size: 16px mobile / 18px desktop
Color: Primary Blue (#2563EB)
Line Height: 1.3
```

##### Location Information
```
Font: Inter Regular (400)
Size: 14px mobile / 16px desktop
Color: Gray 600 (#4B5563)
Line Height: 1.4
```

##### ABV and Technical Details
```
Font: Inter Medium (500)
Size: 14px mobile / 14px desktop
Color: Amber (#F59E0B)
Line Height: 1.2
```

### 8.3 Dark Mode Considerations

#### Dark Mode Color Adaptations
```
Background Colors:
├── Primary: #0F172A (rgb(15, 23, 42))
├── Secondary: #1E293B (rgb(30, 41, 59))
└── Elevated: #334155 (rgb(51, 65, 85))

Text Colors:
├── Primary: #F8FAFC (rgb(248, 250, 252))
├── Secondary: #CBD5E1 (rgb(203, 213, 225))
└── Tertiary: #94A3B8 (rgb(148, 163, 184))

Border Colors:
├── Default: #475569 (rgb(71, 85, 105))
└── Subtle: #334155 (rgb(51, 65, 85))
```

#### Brand Color Adjustments
```
Primary Blue (Dark Mode):
├── Default: #3B82F6 (slightly brighter)
├── Hover: #60A5FA (lighter for contrast)
└── Background: #1E40AF (darker, higher contrast)

Amber (Dark Mode):
├── Default: #FBBF24 (slightly brighter)
├── Text: #FCD34D (higher contrast)
└── Background: #92400E (much darker)
```

### 8.4 Implementation Notes

#### CSS Custom Properties
```css
:root {
  /* Primary Colors */
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;
  
  /* Typography */
  --font-family-primary: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-size-base: 1rem;
  --line-height-base: 1.5;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0f172a;
    --color-text-primary: #f8fafc;
    --color-text-secondary: #cbd5e1;
  }
}
```

#### Font Loading Strategy
```html
<!-- Preload critical font weights -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>

<!-- Font display strategy -->
<style>
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/inter-var.woff2') format('woff2');
    font-weight: 100 900;
    font-display: swap; /* Prevent FOIT */
  }
</style>
```

## Conclusion

This wireframe and mockup document provides a comprehensive visual and UX design guide for the Beer Finder App. The designs prioritize:

1. **Mobile-first responsive approach** ensuring excellent user experience across all devices
2. **Clear visual hierarchy** that guides users through brewery discovery
3. **Intuitive search and filtering** that makes finding breweries effortless
4. **Effective information display** in brewery cards and detail views
5. **Seamless random beer discovery** integration throughout the experience
6. **Robust accessibility** ensuring the app works for all users
7. **Consistent design system** with scalable typography and color schemes

The designs serve as a foundation for development while maintaining flexibility for iteration based on user feedback and technical constraints.