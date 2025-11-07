# 🚀 Deployment Guide - NeuroGarden

## Quick Deploy to Vercel (Recommended)

### Option 1: GitHub Integration (Easiest)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - NeuroGarden landing page"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/neurogarden.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite configuration
   - Click "Deploy" 🎉

3. **Auto-Deployments**:
   - Every push to `main` automatically deploys
   - Pull requests get preview deployments

### Option 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? neurogarden (or your choice)
# - Directory? ./ (current directory)
```

Your site will be live at: `https://neurogarden.vercel.app`

---

## Deploy to Netlify

### Option 1: Netlify UI

1. **Push to GitHub** (see steps above)
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repo
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize and deploy
netlify init

# Deploy to production
netlify deploy --prod
```

---

## Deploy to GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     },
     "homepage": "https://YOUR_USERNAME.github.io/neurogarden"
   }
   ```

3. **Update vite.config.ts**:
   ```typescript
   export default defineConfig({
     base: '/neurogarden/',  // Add this line
     // ... rest of config
   });
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from branch `gh-pages`

---

## Environment Variables

This project doesn't require environment variables for basic deployment.

If you need to add API keys later:

### Vercel
```bash
# Add via CLI
vercel env add API_KEY

# Or via dashboard: Project Settings → Environment Variables
```

### Netlify
```bash
# Add via CLI
netlify env:set API_KEY your_value

# Or via dashboard: Site Settings → Environment Variables
```

---

## Build Configuration

### Production Build
```bash
npm run build
```

Output directory: `dist/`

### Build Optimizations
- Code splitting for vendor libraries
- Tree shaking for unused code
- Minification via esbuild
- Asset optimization

### Preview Production Build Locally
```bash
npm run preview
```

---

## Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as shown
4. Wait for SSL certificate (automatic)

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS or Netlify DNS
4. SSL is automatic

---

## Performance Checklist

Before deploying:

- ✅ All images optimized
- ✅ Bundle size checked (`npm run build`)
- ✅ Lighthouse score > 90
- ✅ Mobile responsiveness tested (320px - 1440px)
- ✅ Accessibility tested (WCAG AA)
- ✅ Forms tested (validation + submission)
- ✅ Cross-browser testing

---

## Troubleshooting

### Build Fails on Vercel/Netlify

**Issue**: TypeScript errors
```bash
# Fix locally first
npm run build

# If successful, commit and push
git add .
git commit -m "Fix build errors"
git push
```

**Issue**: Missing dependencies
```bash
# Ensure all dependencies are in package.json (not devDependencies)
npm install react react-dom gsap lucide-react
```

### 404 on Routes

If you add routing later, update `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Slow Build Times

Vercel/Netlify cache node_modules automatically. To clear cache:

**Vercel**: Redeploy with "Force rebuild"  
**Netlify**: Clear cache and deploy

---

## Monitoring

### Vercel Analytics (Free)

1. Go to Project → Analytics
2. Enable Web Analytics
3. View real-time traffic and performance

### Netlify Analytics ($9/mo)

1. Go to Site → Analytics
2. Enable Analytics
3. View traffic and bandwidth

---

## CI/CD Pipeline

Your deployments are automatic:

```
┌─────────────┐
│ Push to Git │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Auto Build  │  (Vercel/Netlify)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Deploy    │  (Live in ~1-2 min)
└─────────────┘
```

---

## Next Steps After Deployment

1. ✅ Test live site on multiple devices
2. ✅ Run Lighthouse audit
3. ✅ Test contact form submission
4. ✅ Verify analytics tracking
5. ✅ Share with stakeholders! 🎉

---

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev)

---

**Built with ❤️ by Pratham Amritkar**  
*For TechFest 2025 - CA Challenge*
