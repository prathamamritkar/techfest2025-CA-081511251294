# 🚀 Quick Deployment Guide for NeuroGarden

## Your Site Info
- **Repository**: `techfest2025-CA-081511251294`
- **GitHub Pages URL**: `https://prathamamritkar.github.io/techfest2025-CA-081511251294/`
- **Status**: Ready to deploy! ✅

---

## 📋 Pre-Deployment Checklist

Make sure you've done these steps first:

```bash
# 1. Install all dependencies
npm install

# 2. Test locally
npm run dev
# Visit http://localhost:5173 and verify everything works

# 3. Build and preview
npm run build
npm run preview
# Visit http://localhost:4173 and verify the production build
```

---

## 🎯 Method 1: Automatic Deployment (Recommended)

### Using GitHub Actions (Automatic on every push)

1. **Push your code to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Enable GitHub Pages in Repository Settings**
   - Go to: https://github.com/prathamamritkar/techfest2025-CA-081511251294/settings/pages
   - Under "Build and deployment"
   - Set **Source** to: `GitHub Actions`
   - Click Save

3. **Wait for Deployment**
   - Go to Actions tab: https://github.com/prathamamritkar/techfest2025-CA-081511251294/actions
   - You should see a workflow running
   - Wait for the green checkmark ✅
   - Usually takes 2-3 minutes

4. **Visit Your Site**
   - Open: https://prathamamritkar.github.io/techfest2025-CA-081511251294/
   - Your NeuroGarden site should be live! 🌿

---

## 🔧 Method 2: Manual Deployment

### Using gh-pages package

1. **Install gh-pages**
```bash
npm install
```

2. **Build and Deploy**
```bash
npm run deploy
```

3. **Configure GitHub Pages**
   - Go to repository Settings → Pages
   - Set source to: **Deploy from a branch**
   - Select branch: **gh-pages**
   - Folder: **/ (root)**
   - Save

4. **Wait and Visit**
   - Wait 1-2 minutes
   - Visit: https://prathamamritkar.github.io/techfest2025-CA-081511251294/

---

## ✅ What I've Already Fixed

1. ✅ **Updated vite.config.ts** with correct base path
2. ✅ **Created GitHub Actions workflow** (`.github/workflows/deploy.yml`)
3. ✅ **Added deployment scripts** to package.json
4. ✅ **Fixed all import paths** to work with GitHub Pages

---

## 🔍 Verify Deployment

After deployment, check these:

1. **Site loads**: Visit the URL
2. **No 404 errors**: Open browser console (F12)
3. **Animations work**: GSAP animations should play
4. **Images load**: Favicon and any images appear
5. **Forms work**: Try the "Start Growing" dialog

---

## 🐛 If You Still See Errors

### Check the Build Logs
```bash
# Run build locally first
npm run build

# Check for any TypeScript errors
npx tsc --noEmit
```

### Common Issues

**404 on assets:**
- Verify `base` in vite.config.ts matches repo name
- Should be: `/techfest2025-CA-081511251294/`

**Blank page:**
- Check browser console for errors
- Verify the build completed successfully
- Make sure GitHub Pages source is set correctly

**Animations not working:**
- Clear browser cache (Ctrl+Shift+Delete)
- Check console for GSAP errors
- Verify all dependencies installed

---

## 📱 After Successful Deployment

### Share Your Work!

Your live URL:
```
https://prathamamritkar.github.io/techfest2025-CA-081511251294/
```

### Update README

Add this to your README.md:
```markdown
## 🌐 Live Demo

Visit the live site: [NeuroGarden](https://prathamamritkar.github.io/techfest2025-CA-081511251294/)
```

---

## 🔄 Future Updates

Every time you push to the main branch:
1. GitHub Actions automatically builds
2. Deploys to GitHub Pages
3. Site updates in 2-3 minutes

**Manual update:**
```bash
# Make your changes
git add .
git commit -m "Update NeuroGarden"
git push

# If using manual deployment:
npm run deploy
```

---

## 📊 Check Deployment Status

- **GitHub Actions**: https://github.com/prathamamritkar/techfest2025-CA-081511251294/actions
- **GitHub Pages Settings**: https://github.com/prathamamritkar/techfest2025-CA-081511251294/settings/pages

---

## 🎉 Success Indicators

When deployment succeeds, you should see:
- ✅ Green checkmark in Actions tab
- ✅ "Your site is live at..." message in Pages settings
- ✅ Working website at the URL
- ✅ All GSAP animations playing smoothly
- ✅ No console errors (F12)

---

## 💡 Pro Tips

1. **Test locally first**: Always run `npm run build && npm run preview` before deploying
2. **Check Actions tab**: Monitor deployment progress in real-time
3. **Use browser DevTools**: F12 to check for errors
4. **Clear cache**: Hard refresh (Ctrl+Shift+R) after deployment
5. **Mobile test**: Test on mobile devices too!

---

## 🆘 Need Help?

If deployment fails:

1. **Check the build**
```bash
npm run build
# Read any error messages
```

2. **Verify dependencies**
```bash
npm install
npm list gsap react react-dom
```

3. **Check Actions logs**
   - Go to Actions tab
   - Click on failed workflow
   - Read the error messages

4. **Read TROUBLESHOOTING.md**
   - Detailed solutions for common issues

---

## 🎯 One-Command Deploy

If you just want to deploy quickly:

```bash
# Everything in one go
npm install && npm run build && npm run deploy
```

Then set GitHub Pages source to `gh-pages` branch.

---

**Ready to go live?** Run the commands above and your NeuroGarden will bloom on the web! 🌸🧠✨

Built with ❤️ by Pratham Amritkar
