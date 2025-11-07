# NeuroGarden - Cognitive Wellness Platform

AI-powered cognitive training that visualizes mental growth as a digital garden.

## 🌟 Features

- **Task 1**: One-section landing page with pure HTML/CSS animations
- **Task 2**: Multi-section responsive page with professional GSAP animations
- **Task 3**: Fully accessible contact form with mobile-first responsive design

### Key Highlights

✅ **Responsive Design** - Optimized for 320px to 1440px screens  
✅ **GSAP Animations** - Professional scroll-triggered and entrance animations  
✅ **Accessibility** - WCAG compliant with keyboard navigation and screen reader support  
✅ **Client-Side Validation** - Plain JavaScript form validation (no libraries)  
✅ **Mock API Integration** - Simulated contact form submission  

## 🚀 Tech Stack

- **React 18** with TypeScript
- **Vite** for blazing fast builds
- **GSAP** for professional animations
- **Tailwind CSS v3** for styling (production-stable)
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

# Preview production build
npm run preview
```

## 📁 Project Structure

```
├── App.tsx                  # Main application component
├── main.tsx                 # React entry point
├── index.html              # HTML entry point
├── components/             # React components
│   ├── Navbar.tsx
│   ├── ParticleField.tsx
│   ├── GardenVisualizer.tsx
│   ├── TestimonialSection.tsx
│   └── ui/                 # Shadcn/ui components
├── styles/
│   └── globals.css         # Global styles and Tailwind
└── vercel.json            # Vercel configuration

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
Task Completion: ✅ Task 1 | ✅ Task 2 | ✅ Task 3
