# Deployment Guide

## Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your repository: `https://github.com/divyanshbhai/DSK.git`
4. Configure project settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. Add environment variables (if needed):
   - `NEXT_PUBLIC_BASE_URL` = your deployed URL

6. Click "Deploy"

Your site will be live at: `https://your-project-name.vercel.app`