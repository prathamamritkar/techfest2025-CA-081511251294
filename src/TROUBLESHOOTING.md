# 🔧 Troubleshooting Guide - NeuroGarden

## Common Issues & Solutions

### ❌ Issue: "Failed to load resource: 404"

This usually means a file or dependency is missing.

**Solutions:**

1. **Clear and Reinstall Dependencies**
```bash
# Delete node_modules and package-lock
rm -rf node_modules package-lock.json

# Clean npm cache
npm cache clean --force

# Reinstall
npm install
```

2. **Check for Missing Files**
Ensure these files exist:
- `index.html` (root)
- `main.tsx` (root)
- `App.tsx` (root)
- `vite.config.ts` (root)
- `package.json` (root)
- `styles/globals.css`

3. **Verify Import Paths**
Check that all component imports use correct paths:
```typescript
// Correct
import { Button } from './components/ui/button'

// Incorrect
import { Button } from '@/components/ui/button'  // needs alias config
```

---

### ❌ Issue: Vite Dev Server Won't Start

**Error:** `npm run dev` fails or shows errors

**Solutions:**

1. **Check Node Version**
```bash
node --version  # Should be 18.x or higher
```

2. **Update Node if Needed**
```bash
# Using nvm
nvm install 20
nvm use 20
```

3. **Check for Port Conflicts**
```bash
# Kill process on port 5173
# macOS/Linux
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

4. **Try Different Port**
```bash
npm run dev -- --port 3000
```

---

### ❌ Issue: TypeScript Errors

**Error:** "Cannot find module" or type errors

**Solutions:**

1. **Restart TypeScript Server** (in VS Code)
   - Press `Cmd/Ctrl + Shift + P`
   - Type "TypeScript: Restart TS Server"

2. **Check tsconfig.json exists**

3. **Install Type Definitions**
```bash
npm install --save-dev @types/node @types/react @types/react-dom
```

---

### ❌ Issue: GSAP Animations Not Working

**Symptoms:** Elements don't animate, or appear instantly

**Solutions:**

1. **Verify GSAP Installation**
```bash
npm list gsap
# Should show gsap@3.12.5 or similar
```

2. **Check ScrollTrigger Registration**
In `App.tsx`, ensure this line exists:
```typescript
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
```

3. **Check Console for Errors**
Open browser DevTools (F12) and look for red errors

4. **Test Simple Animation**
```typescript
useEffect(() => {
  gsap.to('.test', { x: 100, duration: 1 });
}, []);
```

---

### ❌ Issue: Styles Not Applied / Tailwind Not Working

**Symptoms:** Components have no styling

**Solutions:**

1. **Verify globals.css Import**
In `main.tsx`:
```typescript
import './styles/globals.css'
```

2. **Check Tailwind CSS Version**
```bash
npm list tailwindcss
# Should be 4.x
```

3. **Clear Build Cache**
```bash
rm -rf .vite node_modules/.cache
npm run dev
```

---

### ❌ Issue: Components Not Rendering

**Symptoms:** Blank page or missing components

**Solutions:**

1. **Check Browser Console**
   - Press F12
   - Look for red errors
   - Fix any import errors

2. **Verify Component Exports**
```typescript
// Correct
export default function App() { ... }

// Also correct
export function Navbar() { ... }
```

3. **Check Import Statements**
```typescript
// For default exports
import App from './App'

// For named exports
import { Navbar } from './components/Navbar'
```

---

### ❌ Issue: Build Fails

**Error:** `npm run build` shows errors

**Solutions:**

1. **Check for TypeScript Errors**
```bash
npx tsc --noEmit
```

2. **Fix Any Type Errors**
   - Read error messages carefully
   - Add proper types to functions
   - Use `any` as last resort (not recommended)

3. **Increase Node Memory** (if out of memory)
```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

4. **Clean Build**
```bash
rm -rf dist
npm run build
```

---

### ❌ Issue: Images Not Loading

**Symptoms:** Broken image icons or 404 for images

**Solutions:**

1. **Check Image Paths**
```typescript
// Correct (images in public/)
<img src="/neurogarden-icon.svg" />

// Incorrect
<img src="./neurogarden-icon.svg" />
```

2. **Verify Public Folder Structure**
```
public/
├── neurogarden-icon.svg
└── vite.svg
```

3. **For Dynamic Imports**
```typescript
import logoImg from '/neurogarden-icon.svg'
<img src={logoImg} />
```

---

### ❌ Issue: Dialog/Modal Not Opening

**Symptoms:** Buttons don't open dialogs

**Solutions:**

1. **Check Radix UI Installation**
```bash
npm list @radix-ui/react-dialog
```

2. **Verify Dialog Structure**
```typescript
<Dialog>
  <DialogTrigger asChild>
    <button>Open</button>
  </DialogTrigger>
  <DialogContent>
    {/* Content */}
  </DialogContent>
</Dialog>
```

3. **Check for z-index Issues**
Add to globals.css:
```css
[data-radix-portal] {
  z-index: 9999 !important;
}
```

---

### ❌ Issue: GitHub Pages Shows 404

**Symptoms:** Site works locally but not on GitHub Pages

**Solutions:**

1. **Update vite.config.ts**
```typescript
export default defineConfig({
  base: '/your-repo-name/',  // Add this!
  // ...
})
```

2. **Rebuild and Redeploy**
```bash
npm run build
git add dist -f
git commit -m "Deploy"
git subtree push --prefix dist origin gh-pages
```

3. **Check GitHub Pages Settings**
   - Go to Settings → Pages
   - Ensure source is set correctly
   - Wait 2-3 minutes for deployment

---

### ❌ Issue: Slow Performance / Lag

**Symptoms:** Animations are choppy, page is slow

**Solutions:**

1. **Reduce Particle Count**
In `ParticleField.tsx`, reduce particle count:
```typescript
const particleCount = 30; // Instead of 50
```

2. **Disable Animations on Mobile**
```typescript
const isMobile = window.innerWidth < 768;
if (!isMobile) {
  // Run expensive animations
}
```

3. **Use will-change CSS**
```css
.animated-element {
  will-change: transform, opacity;
}
```

4. **Enable GPU Acceleration**
```typescript
gsap.set('.element', { force3D: true });
```

---

### ❌ Issue: "Module not found" Errors

**Solutions:**

1. **Check File Extensions**
   - All files should end in `.tsx` or `.ts`
   - Imports should include extensions: `'./App.tsx'` or `'./App'`

2. **Check Case Sensitivity**
   - File: `Navbar.tsx`
   - Import: `import { Navbar } from './components/Navbar'` ✅
   - Import: `import { navbar } from './components/navbar'` ❌

3. **Verify Path**
```bash
# Check if file exists
ls components/Navbar.tsx
```

---

### ❌ Issue: Hot Module Replacement (HMR) Not Working

**Symptoms:** Changes don't reflect without manual refresh

**Solutions:**

1. **Restart Dev Server**
```bash
# Ctrl+C to stop
npm run dev
```

2. **Check File Watcher Limits** (Linux/macOS)
```bash
# Increase limit
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

3. **Use Different Browser**
   - Try Chrome/Firefox
   - Clear browser cache

---

## 🆘 Getting More Help

### Debug Mode

Enable verbose logging:
```bash
DEBUG=vite:* npm run dev
```

### Check Versions

```bash
node --version
npm --version
npm list react react-dom gsap
```

### Common Version Requirements

- Node.js: 18.x or higher
- npm: 9.x or higher
- React: 18.2.0
- GSAP: 3.12.5
- Vite: 5.x

### Report an Issue

If none of these solutions work:

1. **Gather Information**
   - What command are you running?
   - What error message do you see?
   - What's your environment? (OS, Node version)

2. **Check Console**
   - Browser console (F12)
   - Terminal output

3. **Create Minimal Reproduction**
   - Identify the smallest code that causes the issue

---

## 📚 Additional Resources

- [Vite Troubleshooting](https://vitejs.dev/guide/troubleshooting.html)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [GSAP Forums](https://greensock.com/forums/)
- [Stack Overflow - Vite Tag](https://stackoverflow.com/questions/tagged/vite)

---

**Still having issues?** Check the browser console (F12) for detailed error messages. Most errors will point you to the exact file and line number causing the problem.

Built with ❤️ by Pratham Amritkar
