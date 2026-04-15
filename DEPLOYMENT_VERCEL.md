# Food Pulse Frontend - Deployment Guide

## Deployment to Vercel

### Prerequisites
- GitHub account with the `food-pulse` repository
- Vercel account (https://vercel.com)
- Render backend URL (from backend deployment)

### Step 1: Prepare Your Frontend

1. Create a `.env.production` file in the root:
```
VITE_API_BASE_URL=https://food-pulse-server.onrender.com
```

2. Update `src/utils/api.js` to use the environment variable:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://food-pulse-server.onrender.com';
```

3. Push to GitHub:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New"** → **"Project"**
3. Import your `food-pulse` repository
4. Configure:
   - **Framework**: `Vite`
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add **Environment Variables**:
   - `VITE_API_BASE_URL`: `https://food-pulse-server.onrender.com`

6. Click **"Deploy"**
7. Wait for deployment to complete
8. Your frontend URL will be something like: `https://food-pulse.vercel.app`

### Step 3: Update Backend with Frontend URL

Go back to Render dashboard for `food-pulse-server`:
1. Settings → Environment
2. Update `FRONTEND_URL`: `https://food-pulse.vercel.app`
3. Click **"Save"** (will redeploy)

## Testing Before Deployment

```bash
# Build locally
npm run build

# Preview production build
npm run preview
```

## Environment Variables for Production

| Variable | Value |
|----------|-------|
| `VITE_API_BASE_URL` | `https://food-pulse-server.onrender.com` |

## Troubleshooting

**API requests fail with 404**
- Make sure backend Render URL is correct
- Check CORS settings in backend

**Build fails**
- Run `npm run build` locally to test
- Check for missing dependencies: `npm install`

**Port 3000 vs Vite**
- Vercel automatically detects Vite projects
- Build command should be `npm run build`
- Output directory should be `dist`

## Performance Optimization

1. Enable Vercel Analytics (optional)
2. Use Vercel's image optimization if adding images
3. Consider Render paid tier for consistent backend performance
