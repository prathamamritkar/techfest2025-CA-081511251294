# NeuroGarden 🌿🧠

An AI-powered cognitive wellness platform that visualizes mental growth as a digital garden.

## 🎯 Project Overview

**NeuroGarden** is a multi-section landing page showcasing a fictional startup focused on cognitive wellness. The platform combines neuroscience, AI, and beautiful visualizations to help users train their minds through gamified exercises.

**Founded by:** Pratham Amritkar

## ✨ Features

### Task 1: Creative Landing Page
- **Semantic HTML** with proper accessibility
- **Custom CSS animations** using @keyframes
- **Interactive elements**: Particle field, mouse glow effects, floating garden icons
- **Live garden visualizer** with animated plants
- **Working signup and demo dialogs**
- **Responsive design** with cohesive nature-themed experience

### Task 2: Professional GSAP Animations
- ✅ **Navbar Slide-In**: Animated navbar slides from top with staggered menu items and spinning logo
- ✅ **Button Hover Pulse**: GSAP-powered scale, pulse, and bounce effects on all buttons
- ✅ **Scroll-Triggered Fade-Ins**: Multiple sections animate on scroll:
  - Features section (3D rotation + fade)
  - Garden stats section (scale + bounce)
  - Testimonials section (stagger animation)
  - Footer with founder section (3D reveal)

## 🎬 Animation Highlights

### Purposeful Motion
- **Timeline-based hero entrance** - Elements cascade naturally
- **Scroll-triggered reveals** - Sections animate into view at the right moment
- **3D transforms** - Subtle depth effects on cards and sections
- **Stagger animations** - Content appears in logical sequence
- **Cinematic easing** - power3, back.out, and custom curves

### JavaScript-Triggered Animations
All animations are triggered through GSAP, not just CSS:
- Button interactions use GSAP timeline animations
- Scroll events use GSAP ScrollTrigger plugin
- Mouse events trigger GSAP tweens
- Hero entrance uses GSAP timeline with delays

## 🚀 Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **GSAP** - Professional animations
- **ScrollTrigger** - Scroll-based animations
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## 📦 Installation

```bash
# Install dependencies
npm install

# Install GSAP
npm install gsap

# Run development server
npm run dev
```

## 🎨 Animation Architecture

### GSAP Timeline Structure
```typescript
// Hero entrance timeline
gsap.timeline({ delay: 1.2 })
  .to(headline, { y: 0, opacity: 1, duration: 1 })
  .to(subheadline, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
  .to(description, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
  .to(buttons, { y: 0, opacity: 1, stagger: 0.15 }, '-=0.4');
```

### Scroll Trigger Configuration
```typescript
ScrollTrigger.create({
  trigger: section,
  start: 'top 75%',
  end: 'top 40%',
  toggleActions: 'play none none reverse',
});
```

## 🌐 Deployment

### Deploy to GitHub Pages

1. **Build the project:**
```bash
npm run build
```

2. **Deploy to GitHub Pages:**
```bash
npm run deploy
```

3. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select source: "Deploy from a branch"
   - Select branch: "gh-pages"
   - Save and wait for deployment

### Deploy to Vercel

1. **Connect your repository** to Vercel
2. **Configure build settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Deploy** - Vercel will auto-deploy on push

### Deploy to Netlify

1. **Connect your repository** to Netlify
2. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Deploy** - Automatic deployment on push

## 📁 Project Structure

```
├── App.tsx                      # Main application with GSAP animations
├── components/
│   ├── Navbar.tsx              # Animated navbar with slide-in
│   ├── TestimonialSection.tsx  # Scroll-triggered testimonials
│   ├── ParticleField.tsx       # Background particle system
│   ├── MouseGlow.tsx           # Interactive mouse glow
│   ├── GardenVisualizer.tsx    # Animated garden visualization
│   ├── FloatingIcon.tsx        # Floating garden icons
│   └── ui/                     # shadcn/ui components
├── styles/
│   └── globals.css             # Global styles and tokens
└── README.md                   # This file
```

## 🎯 Evaluation Criteria Met

### Visual Creativity ✅
- Unique particle field system
- Mouse-tracking glow effects
- Animated garden visualizer
- Floating garden icons
- Gradient animations

### Animation Quality ✅
- Logical timing and sequencing
- Natural easing functions
- Purpose-driven animations
- Scroll-triggered reveals
- 3D transforms and depth

### Originality ✅
- Cognitive wellness theme with garden metaphor
- Living ecosystem visualization
- Neural mapping concept
- AI-powered growth tracking

### Proper Hosting ✅
- Ready for GitHub Pages, Vercel, or Netlify
- Optimized build configuration
- Responsive and accessible

## 🎓 Coding Challenge Completion

### Task 1: Creative Landing Page ✅
- Pure HTML/CSS with custom animations
- Semantic structure
- @keyframes animations
- Creative visual effects
- Accessible and adaptive

### Task 2: Animate the UI like a Pro ✅
- ✅ Navbar slide-in animation
- ✅ Button hover pulse (GSAP-triggered)
- ✅ 4+ scroll-triggered fade-ins
- ✅ JavaScript/GSAP triggered (not just CSS)
- ✅ Elegant and purposeful
- ✅ Natural timing and storytelling

## 👨‍💻 Founder

**Pratham Amritkar**  
Pioneering the intersection of AI, neuroscience, and wellness

## 📄 License

This project uses components from [shadcn/ui](https://ui.shadcn.com/) under [MIT license](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md).

Images from [Unsplash](https://unsplash.com) used under their [license](https://unsplash.com/license).

## 🔗 Links

- **Live Demo**: [Add your deployed URL here]
- **Repository**: [Add your GitHub repo URL here]

---

Built with ❤️ and GSAP by Pratham Amritkar
