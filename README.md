# Algox — Algorithm & Data Structure Visualizer

> **Algorithms in Motion.**  
> *Understand the logic. Visualize the process.*

![Algox Status](https://img.shields.io/badge/Status-Production%20Ready-34D399?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20Mode-3178C6?style=flat-square)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square)
![Vitest](https://img.shields.io/badge/Tests-88%20Passed-34D399?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS%20v4-38BDF8?style=flat-square)

---

## 1. Project Overview

**Algox** is an interactive, developer-grade algorithm and data structure visualizer created by Kalpit. It combines mathematically rigorous algorithm implementations with real-time step snapshots, operation metrics, pseudocode highlighting, and side-by-side algorithm comparison.

Unlike superficial animations or timer-polluted prototypes, **Algox** decouples algorithmic computation from UI rendering using a deterministic state snapshot engine. Every operation count—comparisons, swaps, and array writes—reflects actual execution events rather than synthetic timers or estimated formulas.

---

## 2. Key Features

- **Sorting Visualizer (`/visualizer/sorting`)**:
  - 6 classic algorithms: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort (Lomuto Partition), and Heap Sort.
  - Proportional vertical bar representation with responsive auto-scaling.
  - Distinct visual states: default, comparing, swapping, writing/shifting, pivot, min/max, and confirmed sorted.
  - Full playback controls: Play, Pause, Resume, Step Forward, Step Backward, Reset, and Progress Scrubbing.
  - Variable speed selection: 0.5x, 1x, 2x, 4x.
  - Custom array input modal supporting arbitrary values (-99 to 999) and distributions (Random, Nearly Sorted, Reversed, Few Unique Keys).
  - **Comparison Mode**: Side-by-side synchronous execution of two algorithms on identical input data.

- **Searching Visualizer (`/visualizer/searching`)**:
  - Linear Search and Binary Search.
  - Active search range markers (`low`, `mid`, `high`) and out-of-range element dimming.
  - Invariant validation: Auto-sort alert when Binary Search receives unsorted data.
  - Target presence testing: "Pick Present" vs "Pick Absent" quick target helpers.

- **Data Structures Playground (`/visualizer/data-structures`)**:
  - **Stack (LIFO)**: Push, Pop, Peek, Clear, size and overflow/underflow safeguards in a vertical container with top pointer.
  - **Queue (FIFO)**: Enqueue, Dequeue, Peek Front, Clear, with horizontal pipeline and Front/Rear indicators.
  - **Singly Linked List**: Insert (Head, Tail, Position), Delete (Value, Index), Sequential Search, and Head-to-Tail Traversal with directional pointers and null terminator.
  - **Binary Search Tree (BST)**: Insert, Search, Deletion handling all 3 cases (Leaf, 1 Child, 2 Children with in-order successor replacement), Traversals (In-Order, Pre-Order, Post-Order, Level-Order/BFS) with responsive SVG tree layout.

- **Graph Visualizer (`/visualizer/graph`)**:
  - Breadth-First Search (BFS) and Depth-First Search (DFS).
  - Directed and Undirected graph topologies.
  - Weighted and Unweighted edge toggles.
  - Interactive SVG canvas with draggable nodes, canvas click-to-add, vertex deletion, and custom edge creation.
  - Live frontier tracking: Queue (FIFO) display for BFS and Call Stack (LIFO) for DFS.
  - Presets: Classic 6-Node Network, Directed Acyclic Graph (DAG), and Disconnected Clusters.

- **Algorithm & Complexity Catalogue (`/algorithms`)**:
  - Searchable catalogue with category filters (Sorting, Searching, Linear DS, Trees, Graphs).
  - Master Big-O complexity comparison table.
  - Asymptotic analysis educational primer (Big-O, Big-Omega, Big-Theta).
  - DSA glossary explaining key terms (Stability, In-Place, Invariant, Divide & Conquer).

- **Code & Complexity Explanation Panel**:
  - Active pseudocode line highlighting mapped 1-to-1 with current visualization step.
  - Real-time natural language description of the active operation.
  - Comprehensive complexity specifications (Best, Average, Worst, Auxiliary Space, Stability, In-Place).

---

## 3. Screenshots

*(Screenshots can be added here by capturing views from the running application and placing them into an `assets/screenshots/` directory)*

- **Dashboard / Home**: `![Algox Dashboard](assets/screenshots/dashboard.png)`
- **Sorting Visualizer**: `![Sorting Visualizer](assets/screenshots/sorting.png)`
- **Comparison Mode**: `![Sorting Comparison](assets/screenshots/comparison.png)`
- **Searching Visualizer**: `![Searching Visualizer](assets/screenshots/searching.png)`
- **Data Structures (BST)**: `![BST Visualizer](assets/screenshots/bst.png)`
- **Graph Traversal**: `![Graph Visualizer](assets/screenshots/graph.png)`

---

## 4. Tech Stack

- **UI Framework**: React 19
- **Type System**: TypeScript (Strict Mode enabled)
- **Tooling & Bundler**: Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) with custom developer-tool tokens
- **Routing**: React Router 7 (`createBrowserRouter`)
- **Icons**: Lucide React
- **Testing**: Vitest 5 & `@testing-library/react` with `@testing-library/jest-dom`
- **Architecture**: Domain snapshot generation decoupled from React rendering

---

## 5. Getting Started

### Prerequisites

- Node.js version 18.0.0 or higher
- npm 9.0.0 or higher

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/algox.git
cd algox
npm install
```

### Development Server

Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

### Automated Testing

Run the Vitest test suite covering algorithm correctness, boundary cases, and UI integration:

```bash
npm test
```

To run tests in watch mode during development:

```bash
npm run test:watch
```

### Production Build

Verify TypeScript compilation and generate the optimized production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 6. Supported Algorithms & Complexity Matrix

| Algorithm | Category | Best Time | Average Time | Worst Time | Space | Stable | In-Place |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Bubble Sort** | Sorting | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes | Yes |
| **Selection Sort** | Sorting | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | No | Yes |
| **Insertion Sort** | Sorting | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes | Yes |
| **Merge Sort** | Sorting | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | Yes | No |
| **Quick Sort** | Sorting | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | No | Yes |
| **Heap Sort** | Sorting | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ | No | Yes |
| **Linear Search** | Searching | $O(1)$ | $O(n)$ | $O(n)$ | $O(1)$ | N/A | Yes |
| **Binary Search** | Searching | $O(1)$ | $O(\log n)$ | $O(\log n)$ | $O(1)$ | N/A | Yes |
| **Stack (LIFO)** | Linear DS | $O(1)$ | $O(1)$ | $O(1)$ | $O(n)$ | N/A | Yes |
| **Queue (FIFO)** | Linear DS | $O(1)$ | $O(1)$ | $O(1)$ | $O(n)$ | N/A | Yes |
| **Linked List** | Linear DS | $O(1)$ head | $O(n)$ search | $O(n)$ | $O(n)$ | N/A | Yes |
| **BST** | Tree DS | $O(\log n)$ | $O(\log n)$ | $O(n)$ skewed | $O(n)$ | N/A | Yes |
| **BFS** | Graph | $O(V + E)$ | $O(V + E)$ | $O(V + E)$ | $O(V)$ | N/A | N/A |
| **DFS** | Graph | $O(V + E)$ | $O(V + E)$ | $O(V + E)$ | $O(V)$ | N/A | N/A |

---

## 7. Architecture & Directory Structure

```
algox/
├── public/
│   └── favicon.svg               # Geometric node logo
├── src/
│   ├── algorithms/               # Pure algorithmic generators (no React deps)
│   │   ├── sorting/              # Bubble, Selection, Insertion, Merge, Quick, Heap
│   │   ├── searching/            # Linear Search, Binary Search
│   │   ├── datastructures/       # BST model (SVG layout + 3 deletion cases), Linked list
│   │   └── graph/                # BFS, DFS traversal generators
│   ├── app/                      # App root and React Router tree
│   │   ├── App.tsx
│   │   └── router.tsx
│   ├── components/
│   │   ├── layout/               # Navbar, Footer, Breadcrumbs Layout
│   │   ├── ui/                   # Button, Card, Badge, Slider, Tabs, Modal, Legend
│   │   ├── controls/             # PlaybackControls (step scrubbing, speed selector)
│   │   └── panels/               # CodeExplanationPanel, MetricsPanel
│   ├── data/                     # Algorithms catalogue, presets, and glossary data
│   ├── features/                 # Modular feature pages
│   │   ├── home/                 # Dashboard with module discovery and quick finder
│   │   ├── sorting/              # Array bar visualization & Comparison mode
│   │   ├── searching/            # Number box visualization & range bounds
│   │   ├── ds/                   # Stack, Queue, Linked List, BST playgrounds
│   │   ├── graph/                # SVG canvas with draggable nodes & frontier displays
│   │   ├── reference/            # Full catalogue, Big-O table & glossary
│   │   └── about/                # Technical overview & architectural pillars
│   ├── hooks/                    # Reusable React hooks
│   │   ├── usePlaybackEngine.ts  # Generic playback engine (scrubbing, speed, cancel)
│   │   └── useLocalStorage.ts    # Resilient local storage with fallbacks
│   ├── test/                     # Vitest automated test suites
│   │   ├── sorting.test.ts       # 48 tests across 6 algorithms & boundary cases
│   │   ├── searching.test.ts     # 12 tests across linear/binary searching cases
│   │   ├── dataStructures.test.ts# 13 tests across Linked List & BST operations
│   │   ├── graph.test.ts         # 7 tests across BFS & DFS topologies
│   │   ├── components.test.tsx   # 8 tests across UI components & validators
│   │   └── setup.ts              # Vitest test setup and jest-dom extensions
│   ├── types/                    # Domain types and interfaces
│   └── utils/                    # Array generators and integer parsing validators
├── index.html                    # Dark IDE theme metadata & Inter font imports
├── package.json                  # Scripts and dependencies
├── tsconfig.app.json             # Strict TypeScript compiler options
├── vite.config.ts                # Vite configuration with Tailwind CSS and Vitest
└── README.md
```

---

## 8. Design Decisions & Known Boundaries

1. **State Snapshot Playback**:
   Algorithms yield an array of immutable step records rather than managing timeouts internally. This architecture eliminates race conditions, allows accurate reverse stepping, and makes automated testing completely deterministic without asynchronous wait sleeps.

2. **Native SVG & CSS Rendering**:
   Visualizations use pure SVG paths, lines, circles, and CSS flex/grid boxes. This ensures responsive layout recalculation across mobile, tablet, and desktop viewports without bitmap degradation.

3. **Client-Side Autonomy**:
   Algox requires zero backend servers, cloud databases, or API keys. All state is maintained locally in memory with non-essential preferences preserved via browser `localStorage`.

4. **Visual Sizing Bounds**:
   Array sizes are capped at 40 elements for sorting and 35 for searching to preserve bar spacing and legible value labels on standard displays.

---

## 9. Deployment Instructions

### Vercel Deployment

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import the `algox` repository.
4. Set Build Command to `npm run build` and Output Directory to `dist`.
5. Deploy.

### GitHub Pages Deployment

1. In `vite.config.ts`, configure `base: '/algox/'` (or your repository name).
2. Install `gh-pages`: `npm install -D gh-pages`.
3. Add deploy script to `package.json`: `"deploy": "npm run build && gh-pages -d dist"`.
4. Run `npm run deploy`.

---

## 10. License

This project is licensed under the [MIT License](LICENSE).
