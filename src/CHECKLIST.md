# ✅ Deployment Checklist for NeuroGarden

## Before You Deploy

### Local Testing
- [ ] Run `npm install` successfully
- [ ] Run `npm run dev` - site works at localhost:5173
- [ ] All GSAP animations work (navbar slide, button pulse, scroll triggers)
- [ ] No console errors in browser (F12)
- [ ] Forms/dialogs open correctly
- [ ] Responsive on mobile view

### Build Testing
- [ ] Run `npm run build` successfully
- [ ] No TypeScript errors
- [ ] Run `npm run preview` - production build works
- [ ] Check dist folder was created

---

## GitHub Repository Setup

### Repository Configuration
- [ ] Code pushed to GitHub
- [ ] Repository name: `techfest2025-CA-081511251294`
- [ ] Main branch exists (main or master)
- [ ] All files committed

### Files Present
- [ ] `vite.config.ts` has base: `/techfest2025-CA-081511251294/`
- [ ] `.github/workflows/deploy.yml` exists
- [ ] `public/.nojekyll` file exists
- [ ] `package.json` has deploy script

---

## GitHub Pages Setup

### Method 1: GitHub Actions (Recommended)
- [ ] Go to Settings → Pages
- [ ] Set Source to: **GitHub Actions**
- [ ] Push code to trigger workflow
- [ ] Check Actions tab for green checkmark
- [ ] Wait 2-3 minutes
- [ ] Visit: https://prathamamritkar.github.io/techfest2025-CA-081511251294/

### Method 2: Manual Deployment
- [ ] Run `npm run deploy`
- [ ] Go to Settings → Pages
- [ ] Set Source to: **Deploy from a branch**
- [ ] Select branch: **gh-pages** → **/ (root)**
- [ ] Save and wait 1-2 minutes
- [ ] Visit: https://prathamamritkar.github.io/techfest2025-CA-081511251294/

---

## Post-Deployment Verification

### Site Functionality
- [ ] Homepage loads without 404 errors
- [ ] Navbar slides in on page load
- [ ] Buttons have pulse effect on hover
- [ ] Scroll down - sections fade in
- [ ] "Start Growing" dialog opens
- [ ] "Watch Demo" dialog opens
- [ ] All images load (favicon, etc.)
- [ ] Footer shows "Pratham Amritkar"

### Technical Checks
- [ ] Open browser console (F12) - no errors
- [ ] Network tab shows all resources loaded
- [ ] Animations are smooth
- [ ] Mobile responsive works
- [ ] All links work

### Performance
- [ ] Page loads in < 3 seconds
- [ ] GSAP animations are smooth (not choppy)
- [ ] No lag when scrolling
- [ ] Works on different browsers (Chrome, Firefox, Safari)

---

## Troubleshooting Checklist

If site doesn't work:

### Check These First
- [ ] Cleared browser cache (Ctrl+Shift+R)
- [ ] Waited 2-3 minutes after deployment
- [ ] GitHub Pages is enabled in Settings
- [ ] Actions workflow completed successfully
- [ ] No errors in browser console

### Build Issues
- [ ] `base` in vite.config.ts matches repo name exactly
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] Dependencies installed: `npm install`
- [ ] Build succeeds locally: `npm run build`

### 404 Errors
- [ ] Base path is `/techfest2025-CA-081511251294/` (with slashes)
- [ ] index.html references `/main.tsx` correctly
- [ ] .nojekyll file in public folder
- [ ] GitHub Pages source is set correctly

---

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Test locally
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy (manual method)
npm run deploy

# Check for TypeScript errors
npx tsc --noEmit

# Full deploy (one command)
npm install && npm run build && npm run deploy
```

---

## Success Criteria

Your deployment is successful when:

✅ No 404 errors in console  
✅ Site loads at: https://prathamamritkar.github.io/techfest2025-CA-081511251294/  
✅ Navbar slides in from top  
✅ Buttons pulse on hover (GSAP-powered)  
✅ Sections fade in when scrolling  
✅ All animations are smooth  
✅ Dialogs/modals work  
✅ Mobile responsive  

---

## Important URLs

- **Live Site**: https://prathamamritkar.github.io/techfest2025-CA-081511251294/
- **Repository**: https://github.com/prathamamritkar/techfest2025-CA-081511251294
- **Actions**: https://github.com/prathamamritkar/techfest2025-CA-081511251294/actions
- **Pages Settings**: https://github.com/prathamamritkar/techfest2025-CA-081511251294/settings/pages

---

## Notes

- Base path: `/techfest2025-CA-081511251294/`
- Branch: `main` or `master`
- Deploy method: GitHub Actions or gh-pages
- Build output: `dist` folder

---

**Last Updated**: November 7, 2025  
**Founder**: Pratham Amritkar  
**Status**: Ready for deployment! 🚀
