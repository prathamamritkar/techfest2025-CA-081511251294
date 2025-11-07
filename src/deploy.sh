#!/bin/bash

echo "🌱 NeuroGarden - Vercel Deployment Script"
echo "=========================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git branch -M main
else
    echo "✅ Git repository already initialized"
fi

# Stage all files
echo "📝 Staging files..."
git add .

# Commit
echo "💾 Creating commit..."
git commit -m "Deploy: NeuroGarden landing page - Tasks 1, 2, 3 complete" || echo "No changes to commit"

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo ""
    echo "⚠️  Vercel CLI not found!"
    echo "📥 Install it with: npm install -g vercel"
    echo ""
    echo "Then run this script again, or deploy via:"
    echo "  1. Push to GitHub: git push origin main"
    echo "  2. Import on vercel.com"
    exit 1
fi

# Deploy to Vercel
echo ""
echo "🚀 Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo "🎉 Your site is live!"
