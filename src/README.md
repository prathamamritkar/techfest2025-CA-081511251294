# NeuroGarden - Cognitive Wellness Platform

AI-powered cognitive training that visualizes mental growth as a digital garden.

## 🌟 Features

- **Task 1**: One-section landing page with pure HTML/CSS animations
- **Task 2**: Multi-section responsive page with professional GSAP animations
- **Task 3**: Fully accessible contact form with mobile-first responsive design
- **Task 4**: Advanced CSS Grid layout with pure CSS/SVG micro-illustration
- **Task 5**: Vanilla JavaScript UI components (Modal, Tabs, Carousel) with full accessibility

### Key Highlights

✅ **Responsive Design** - Optimized for 320px to 1440px screens  
✅ **GSAP Animations** - Professional scroll-triggered and entrance animations  
✅ **Accessibility** - WCAG 2.1 AA compliant with full keyboard and screen reader support  
✅ **Client-Side Validation** - Plain JavaScript form validation (no libraries)  
✅ **Mock API Integration** - Simulated contact form submission  
✅ **CSS Grid Layout** - Two-column responsive hero with elegant reflow  
✅ **Pure CSS Illustration** - Custom brain/garden micro-illustration (no images)  
✅ **CSS Custom Properties** - Comprehensive theme system with 20+ variables  
✅ **Vanilla JS Components** - Reusable Modal, Tabs, and Carousel with ARIA support  
✅ **Unit Testing** - Jest tests with 70%+ coverage  
✅ **CI/CD Pipeline** - Automated testing on every PR via GitHub Actions  

## 🚀 Tech Stack

- **React 18** with TypeScript
- **Vite 5** for blazing fast builds
- **GSAP** with ScrollTrigger for professional animations
- **Tailwind CSS v3** for styling (production-stable)
- **CSS Grid & Custom Properties** for advanced layouts
- **Pure CSS/SVG** for custom illustrations
- **Vanilla JavaScript** for reusable UI components
- **Jest + ts-jest** for unit testing
- **GitHub Actions** for CI/CD
- **Radix UI** for accessible components
- **Lucide React** for icons

## 📦 Deployment

### Deploy to Vercel

1. **Quick Deploy**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Connect to GitHub** (Recommended):
   - Push your code to GitHub
   - Import project on [vercel.com](https://vercel.com)
   - Vercel will auto-detect Vite and deploy

3. **Environment Variables**:
   No environment variables needed for this project.

### Deploy to Netlify

1. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Quick Deploy**:
   ```bash
   # Install Netlify CLI
   npm i -g netlify-cli
   
   # Deploy
   netlify deploy --prod
   ```

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Preview production build
npm run preview
```

## 📁 Project Structure

```
├── App.tsx                  # Main application component
├── main.tsx                 # React entry point
├── index.html              # HTML entry point
├── components/                     # React components
│   ├── Navbar.tsx
│   ├── BrainIllustration.tsx       # Task 4: Pure CSS/SVG illustration
│   ├── VanillaComponentsDemo.tsx   # Task 5: Demo integration
│   ├── ParticleField.tsx
│   ├── GardenVisualizer.tsx
│   ├── TestimonialSection.tsx
│   └── ui/                         # Shadcn/ui components
├── lib/
│   └── vanilla-components/         # Task 5: Vanilla JS components
│       ├── Modal.ts
│       ├── Tabs.ts
│       ├── Carousel.ts
│       └── index.ts
├── tests/                          # Task 5: Unit tests
│   ├── Modal.test.ts
│   ├── Tabs.test.ts
│   └── Carousel.test.ts
├── .github/workflows/
│   └── test.yml                    # Task 5: CI/CD pipeline
├── styles/
│   └── globals.css                 # Global styles, Tailwind, CSS variables
├── jest.config.js                  # Task 5: Jest configuration
└── vercel.json                     # Vercel configuration

```

## ✨ Features Breakdown

### Task 1: Landing Page Foundation
- Pure HTML/CSS animations
- Digital garden theme
- NeuroGarden branding

### Task 2: GSAP Animations
- Navbar slide-in on page load
- Button hover pulse effects (JavaScript-triggered)
- Scroll-triggered fade-ins for sections
- Hero entrance timeline animation
- Stats counter animations
- Footer and founder attribution animations

### Task 3: Responsive & Accessible
- Mobile-first CSS (320px base)
- Breakpoints: 480px, 768px, 1024px, 1440px
- Accessible contact form with:
  - Semantic HTML
  - ARIA labels and live regions
  - Keyboard navigation
  - Focus management
  - Real-time validation
  - Success/error states
  - Screen reader friendly messages

### Task 4: Advanced CSS Layout & Illustration
- **CSS Grid Hero Layout**:
  - Two-column responsive design
  - Elegant reflow from desktop to mobile
  - Fluid spacing with clamp()
  - Desktop: 1.2fr (content) + 1fr (illustration)
  - Mobile: Single column stack
- **Pure CSS/SVG Micro-Illustration - "Thoughts Bloom into Gardens"**:
  - **Meaningful Concept**: Visual metaphor of neural activity transforming into blooming flowers
  - **6 Visual Layers**:
    1. Brain Core (**unified & recognizable** - overlapping hemispheres, fissure, corpus callosum, 6 cortex folds)
    2. Thought Streams (SVG paths with flowing gradients)
    3. Blooming Flowers (3 flowers with petals, stems, leaves)
    4. Thought Bubbles (ideas rising from brain to flowers)
    5. Energy Sparks (twinkling neural activity)
    6. Consciousness Aura (expanding awareness ripples)
  - **Brain Design**: Hemispheres overlap and join (no gap!) creating immediately recognizable brain shape
  - **15+ unique @keyframes animations**
  - **NO raster images** - 100% code-based visuals
  - **NO external icon libraries** - All custom shapes
  - **Creative storytelling** through CSS artistry
- **CSS Custom Properties Theme**:
  - 20+ CSS variables for colors, spacing, timing
  - Consistent glow effects system
  - Reusable animation durations
  - Easy theme customization
- **Advanced Animations**:
  - Living brain breathing effect
  - Thoughts flowing upward (SVG path animation)
  - Sequential flower blooming (stem → bloom → dance)
  - Ideas transforming (bubbles rising)
  - Neural sparks twinkling
  - Consciousness expanding
  - All animations choreographed to tell a story
  - Respects prefers-reduced-motion

### Task 5: Vanilla JavaScript UI Components
- **Three Reusable Components** built in plain TypeScript/JavaScript:
  1. **Modal Dialog**:
     - Focus trap (Tab cycles within modal)
     - ESC key to close
     - Click outside to close
     - Focus restoration on close
     - Body scroll lock
     - Full ARIA support (role="dialog", aria-modal, aria-hidden)
  2. **Tabbed Content**:
     - Arrow key navigation (← →)
     - Home/End keys for first/last tab
     - Auto or manual activation
     - Full ARIA roles (tablist, tab, tabpanel)
     - aria-selected, aria-controls, tabindex management
  3. **Carousel/Slider**:
     - Touch swipe support (configurable threshold)
     - Keyboard navigation (arrows, Home, End)
     - Auto-play with pause on hover/focus
     - Loop or stop at ends
     - Dot indicators with aria-current
     - ARIA live region for screen reader announcements
- **Clean Component API**: Configurable options, callbacks, public methods
- **Unit Testing**: Jest + ts-jest with 70%+ coverage
  - Modal: 14 test cases
  - Tabs: 13 test cases
  - Carousel: 17 test cases
- **CI/CD Pipeline**: GitHub Actions runs tests on every PR
- **Live Demo**: Integrated interactive showcase in the app

## 🎨 Design Philosophy

- **Inclusive**: WCAG 2.1 AA compliant
- **Performant**: Optimized bundle splitting
- **Responsive**: Mobile-first approach
- **Animated**: Purposeful, elegant animations
- **Accessible**: Full keyboard and screen reader support

## 👨‍💻 Developer

**Pratham Amritkar**  
*Pioneering the intersection of AI, neuroscience, and wellness*

## 📄 License

© 2025 NeuroGarden. All rights reserved.

---

Built for **TechFest 2025 - CA Challenge**  
Task Completion: ✅ Task 1 | ✅ Task 2 | ✅ Task 3 | ✅ Task 4 | ✅ Task 5

## 📚 Additional Documentation

- [Task 4 Technical Documentation](./TASK4_DOCUMENTATION.md) - In-depth technical breakdown
- [Task 5 Technical Documentation](./TASK5_DOCUMENTATION.md) - Vanilla JS components guide
- [Illustration Concept](./ILLUSTRATION_CONCEPT.md) - Creative vision and symbolism explained
- [Brain Structure Guide](./BRAIN_STRUCTURE_GUIDE.md) - Unified brain design implementation
- [Task Completion Summary](./TASK_COMPLETION_SUMMARY.md) - Complete project overview
- [Attribution](./Attributions.md) - Credits and acknowledgments
- [Guidelines](./guidelines/Guidelines.md) - Project guidelines and standards
