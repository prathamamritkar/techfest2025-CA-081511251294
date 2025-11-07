# 🚀 Deployment Guide - NeuroGarden

## Quick Start - Local Development

### Prerequisites
- Node.js 18+ and npm installed
- Git installed

### Installation Steps

1. **Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

Your app should now be running at `http://localhost:5173/`

3. **Build for Production**
```bash
npm run build
```

4. **Preview Production Build**
```bash
npm run preview
```

---

## 🌐 Deploy to GitHub Pages

### Method 1: Using GitHub Actions (Recommended)

1. **Create GitHub Actions Workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. **Update vite.config.ts**

Replace `/your-repo-name/` with your actual repository name:

```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
  base: '/neurogarden/', // Replace with your repo name
})
```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**
   - Push your changes and the workflow will automatically deploy

4. **Access Your Site**
   - Your site will be available at: `https://yourusername.github.io/neurogarden/`

---

### Method 2: Manual Deployment with gh-pages

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Add Deploy Script to package.json**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. **Update vite.config.ts base path**
```typescript
base: '/neurogarden/', // Your repo name
```

4. **Deploy**
```bash
npm run deploy
```

5. **Configure GitHub Pages**
   - Go to repository **Settings** → **Pages**
   - Select source: **Deploy from a branch**
   - Select branch: **gh-pages** → **/ (root)**
   - Save

---

## 🎯 Deploy to Vercel (Easiest)

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel auto-detects Vite settings

3. **Deploy**
   - Click "Deploy"
   - Done! Auto-deploys on every push

**Build Settings (Auto-detected):**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

---

## 🔥 Deploy to Netlify

### Method 1: Netlify UI

1. **Push to GitHub**

2. **Import to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select repository

3. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy"

### Method 2: Netlify CLI

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Login**
```bash
netlify login
```

3. **Deploy**
```bash
netlify deploy --prod
```

---

## 📦 Build Optimization

### Environment Variables

Create `.env.production`:
```env
VITE_APP_TITLE=NeuroGarden
VITE_APP_DESCRIPTION=AI-powered cognitive wellness platform
```

### Optimize Build

In `vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'gsap-vendor': ['gsap'],
          'ui-vendor': ['lucide-react', '@radix-ui/react-dialog'],
        },
      },
    },
  },
})
```

---

## 🔍 Troubleshooting

### 404 on GitHub Pages

**Problem:** Getting 404 errors on routes

**Solution:** 
1. Add `404.html` that redirects to `index.html`
2. Or ensure `base` in `vite.config.ts` matches your repo name

### Blank Page After Deploy

**Problem:** App shows blank page

**Solution:**
1. Check browser console for errors
2. Verify `base` path in `vite.config.ts`
3. Check that assets are loading from correct path

### GSAP Animations Not Working

**Problem:** Animations don't play after deployment

**Solution:**
1. Ensure GSAP is in `dependencies`, not `devDependencies`
2. Check that ScrollTrigger is registered
3. Verify no console errors

### Build Fails

**Problem:** Build command fails

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## ✅ Pre-Deployment Checklist

- [ ] `npm install` runs without errors
- [ ] `npm run dev` works locally
- [ ] `npm run build` completes successfully
- [ ] `npm run preview` shows the built site correctly
- [ ] All images and assets load
- [ ] GSAP animations work
- [ ] Responsive design tested
- [ ] No console errors
- [ ] Meta tags and favicon set
- [ ] Update `base` in vite.config.ts for GitHub Pages

---

## 🎨 Custom Domain (Optional)

### For GitHub Pages

1. Add `CNAME` file to `/public/` folder:
```
neurogarden.yourdomain.com
```

2. Configure DNS:
   - Add CNAME record pointing to: `yourusername.github.io`

3. Enable HTTPS in GitHub Pages settings

### For Vercel/Netlify

1. Go to domain settings in dashboard
2. Add custom domain
3. Follow DNS configuration instructions

---

## 📊 Performance Tips

1. **Lazy load components**
```typescript
const TestimonialSection = lazy(() => import('./components/TestimonialSection'))
```

2. **Optimize images**
   - Use WebP format
   - Compress before upload
   - Use appropriate sizes

3. **Code splitting**
   - Already configured in Vite
   - Separate vendor chunks

4. **Enable compression**
   - Gzip/Brotli enabled by default on Vercel/Netlify

---

## 🔗 Resources

- [Vite Deployment Docs](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages Setup](https://docs.github.com/en/pages)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

---

Built with ❤️ by Pratham Amritkar
