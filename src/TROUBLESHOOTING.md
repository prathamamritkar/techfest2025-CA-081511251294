# 🔍 Troubleshooting Guide - NeuroGarden Deployment

## 🎯 Quick Diagnosis

### ✅ Issue: RESOLVED
The `patch-package: command not found` error has been **completely fixed**.

---

## 📋 Problem History

### Initial Error
```bash
npm error path /vercel/path0/node_modules/rollup
npm error command failed
npm error command sh -c patch-package
npm error sh: line 1: patch-package: command not found
Error: Command "npm install" exited with 127
```

### Root Cause
- **Tailwind CSS v4.0.0** (alpha/experimental)
- Had dependencies requiring `patch-package` for postinstall scripts
- `patch-package` was not in project dependencies
- Build failed before reaching compile stage

### Solution Applied
✅ Downgraded to **Tailwind CSS v3.4.14** (stable)  
✅ Added `patch-package` as devDependency (safety)  
✅ Migrated CSS syntax from v4 to v3  
✅ Added proper config files (`tailwind.config.js`, `postcss.config.js`)

---

## 🔧 If You Encounter New Issues

### Issue: Build Still Fails

**Symptom**: Vercel build fails with any error

**Diagnosis Steps**:
```bash
# 1. Test build locally
npm install
npm run build

# 2. Check for errors in terminal
# 3. Look for specific error message
```

**Common Causes**:
1. **Cached node_modules**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Outdated npm version**
   ```bash
   npm install -g npm@latest
   ```

3. **Git uncommitted files**
   ```bash
   git status
   git add .
   git commit -m "Fix: Add missing files"
   ```

**Solution**: 
- Clear Vercel cache: "Redeploy with force rebuild"
- Check Vercel build logs for specific error
- Ensure all files are committed to Git

---

### Issue: Blank Page After Deploy

**Symptom**: Build succeeds but site shows blank page

**Diagnosis**:
```bash
# Open browser console (F12)
# Look for errors
```

**Common Causes**:
1. **Missing index.html**
   - ✅ We have it at `/index.html`

2. **Incorrect asset paths**
   - Check browser network tab for 404 errors

3. **JavaScript errors**
   - Check console for red errors

**Solution**:
```bash
# Verify main.tsx imports App correctly
# Check that App.tsx has default export
# Ensure all imports use correct paths
```

---

### Issue: Tailwind Classes Not Working

**Symptom**: Elements have no styling

**Diagnosis**:
```bash
# Check if Tailwind CSS is imported
# Verify globals.css is loaded
```

**Solution**:
- Ensure `main.tsx` imports `./styles/globals.css`
- Verify `tailwind.config.js` exists
- Check `postcss.config.js` is present
- Rebuild: `npm run build`

---

### Issue: GSAP Animations Don't Work

**Symptom**: No animations on page

**Diagnosis**:
```bash
# Open console, look for GSAP errors
# Check if gsap is imported correctly
```

**Common Causes**:
1. GSAP not loaded
2. ScrollTrigger not registered
3. Animation targets not found

**Solution**:
```typescript
// Verify in App.tsx:
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

---

### Issue: Contact Form Validation Not Working

**Symptom**: Form submits without validation

**Diagnosis**:
```bash
# Check console for JavaScript errors
# Verify validation functions are called
```

**Solution**:
- Check form `onSubmit` handler
- Verify validation functions exist
- Test each field individually

---

### Issue: Mobile Menu Not Opening

**Symptom**: Hamburger icon doesn't work on mobile

**Diagnosis**:
```bash
# Check if onClick handler is attached
# Verify state management works
```

**Solution**:
- Check Navbar.tsx `useState` for menu state
- Verify mobile menu CSS classes
- Test on actual mobile device (not just dev tools)

---

### Issue: Slow Page Load

**Symptom**: Site takes > 5 seconds to load

**Diagnosis**:
```bash
# Run Lighthouse audit
# Check network tab for slow resources
```

**Optimization**:
1. Images already optimized (Unsplash CDN)
2. Bundle already split (Vite default)
3. CSS already minified

**If still slow**:
- Check Vercel region (should be closest to users)
- Enable Vercel Edge Network
- Consider adding lazy loading for below-fold content

---

### Issue: TypeScript Errors in Build

**Symptom**: Build fails with TS errors

**Diagnosis**:
```bash
npm run build
# Look for specific TS error
```

**Solution**:
```bash
# We've already relaxed tsconfig.json
# But if new errors appear:

# Option 1: Fix the type error
# Option 2: Add // @ts-ignore above error
# Option 3: Relax tsconfig further (not recommended)
```

---

### Issue: Vercel Deploy Stuck/Frozen

**Symptom**: Build running for > 10 minutes

**Diagnosis**:
- Check Vercel dashboard for build logs
- Look for hanging process

**Solution**:
1. Cancel and redeploy
2. Check for infinite loops in code
3. Verify no large files in repo (> 100MB)

**Build Time Expectations**:
- npm install: 30-60 seconds
- npm run build: 2-3 minutes
- Total: 3-5 minutes max

---

## 🆘 Emergency Fixes

### Nuclear Option: Fresh Install

If nothing else works:

```bash
# 1. Backup your code
cp -r . ../neurogarden-backup

# 2. Remove all generated files
rm -rf node_modules
rm -rf dist
rm package-lock.json

# 3. Fresh install
npm install

# 4. Test build
npm run build

# 5. If works, commit and deploy
git add .
git commit -m "Fresh install"
git push
```

---

### Rollback to Previous Version

If new changes broke something:

```bash
# Find last working commit
git log --oneline

# Revert to it (replace COMMIT_HASH)
git reset --hard COMMIT_HASH

# Force push (careful!)
git push --force
```

---

## 📞 Getting Help

### Useful Resources

1. **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
2. **Vite Docs**: [vitejs.dev](https://vitejs.dev)
3. **Tailwind Docs**: [tailwindcss.com](https://tailwindcss.com)
4. **GSAP Docs**: [greensock.com/docs](https://greensock.com/docs)
5. **React Docs**: [react.dev](https://react.dev)

### Error Search Strategy

```
1. Copy exact error message
2. Search: "vercel [error message]"
3. Check Vercel GitHub issues
4. Check Stack Overflow
5. Check project documentation files
```

---

## ✅ Current Status

As of **November 7, 2025**:

- ✅ All known deployment issues resolved
- ✅ Build succeeds on Vercel
- ✅ All features functional
- ✅ No console errors
- ✅ Performance optimized
- ✅ Accessibility compliant

---

## 🔒 Prevention Tips

To avoid future issues:

1. **Always test locally before deploying**
   ```bash
   npm run build && npm run preview
   ```

2. **Use stable dependencies**
   - Avoid alpha/beta packages in production
   - Check changelog before upgrading

3. **Commit frequently**
   ```bash
   git add .
   git commit -m "Descriptive message"
   ```

4. **Review Vercel build logs**
   - Even on successful builds
   - Watch for warnings

5. **Monitor performance**
   - Run Lighthouse regularly
   - Check Core Web Vitals

---

## 📊 Health Checklist

Run this before each deployment:

```bash
# ✅ Code quality
npm run build        # Should succeed
# npm run lint       # Optional if you have it

# ✅ Git status
git status           # All files committed?

# ✅ Dependencies
npm outdated         # Any critical updates?

# ✅ Preview
npm run preview      # Test production build locally
```

---

**Remember**: The current configuration is **production-tested and stable**! 🎉

If you encounter any issues, check:
1. `FINAL_FIX.md` - What was fixed
2. `DEPLOY_NOW.md` - How to deploy
3. `TROUBLESHOOTING.md` - This file

**Built by**: Pratham Amritkar  
**Status**: ✅ All Systems Go!
