# Food Pulse - Complete Deployment Checklist

## Pre-Deployment Tasks

### 1. Backend Repository Setup (Render)

- [ ] Create new GitHub repo: `food-pulse-server`
- [ ] Copy `/server` folder contents to new repo
- [ ] Ensure `.gitignore` includes: `node_modules/`, `.env`
- [ ] Create `.env.example` with all required variables (DONE)
- [ ] Create `DEPLOYMENT.md` with Render instructions (DONE)
- [ ] Commit and push to GitHub
- [ ] Verify all files are in GitHub (except `.env` and `node_modules`)

### 2. Frontend Repository Setup (Vercel)

- [ ] Ensure main repo is ready
- [ ] Check `.env.local` has development settings (DONE)
- [ ] Create `.env.production` with Render backend URL (DONE)
- [ ] Verify `src/utils/api.js` uses environment variables (DONE)
- [ ] Create `DEPLOYMENT_VERCEL.md` with Vercel instructions (DONE)
- [ ] Test locally: `npm run build && npm run preview`
- [ ] Commit and push to GitHub

### 3. MongoDB Atlas Configuration

- [ ] Ensure MongoDB Atlas is set up
- [ ] Go to Network Access in MongoDB Atlas
- [ ] Add Render IP: `0.0.0.0/0` (allows all IPs - less secure, good for free tier)
- [ ] Or add specific Render IP (more secure)
- [ ] Note: Free tier MongoDB Atlas has limitations

### 4. Firebase Configuration

- [ ] Firebase project created
- [ ] Firebase config in frontend `.env.local` (DONE)
- [ ] Enable Email/Password authentication
- [ ] Enable Anonymous auth if needed

---

## Deployment Steps

### A. Deploy Backend to Render

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub account

2. **Deploy Backend Service**
   - Click "New +" → "Web Service"
   - Connect GitHub account
   - Select `food-pulse-server` repo
   - Configure:
     - Name: `food-pulse-server`
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `npm start`
     - Plan: Free

3. **Set Environment Variables in Render**
   - Go to Web Service Settings → Environment
   - Add all variables from `.env`:
     ```
     MONGODB_URI=mongodb+srv://...
     PORT=5000
     FIREBASE_PROJECT_ID=fridge-tracker-94e52
     JWT_SECRET=<generate-random-string>
     NODE_ENV=production
     FRONTEND_URL=<will-update-after-vercel-deployment>
     ```
   - Click Save (will redeploy)

4. **Test Backend**
   - Wait for deployment to complete
   - Copy Render URL (e.g., `https://food-pulse-server.onrender.com`)
   - Test: `curl https://food-pulse-server.onrender.com/foods`

### B. Deploy Frontend to Vercel

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub account

2. **Deploy Frontend**
   - Click "Add New" → "Project"
   - Import `food-pulse` repository
   - Configure:
     - Framework: `Vite`
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

3. **Set Environment Variables in Vercel**
   - Go to Settings → Environment Variables
   - Add all variables from `.env.production`:
     ```
     VITE_API_BASE_URL=https://food-pulse-server.onrender.com
     VITE_apiKey=AIzaSyBIQ2eXDfJ0bXYo-A5_ub5Q0vfTDES76BI
     VITE_authDomain=fridge-tracker-94e52.firebaseapp.com
     VITE_projectId=fridge-tracker-94e52
     VITE_storageBucket=fridge-tracker-94e52.firebasestorage.app
     VITE_messagingSenderId=748539662690
     VITE_appId=1:748539662690:web:1581eeeb8e9bbfba585c3b
     ```
   - Click Save (will redeploy)

4. **Test Frontend**
   - Wait for deployment to complete
   - Copy Vercel URL (e.g., `https://food-pulse.vercel.app`)
   - Test in browser: Register, Login, Add Food

### C. Final Backend Update

1. **Update Render Environment Variable**
   - Go back to Render dashboard
   - Settings → Environment Variables
   - Update `FRONTEND_URL`: `https://food-pulse.vercel.app`
   - Click Save (will redeploy)

---

## Testing Post-Deployment

### Frontend Tests
- [ ] Homepage loads correctly
- [ ] Can register new account
- [ ] Can login with email/password
- [ ] Can login with Firebase/Google
- [ ] Can add food item
- [ ] Food appears in "Fridge" section
- [ ] Food appears in "My Items" section
- [ ] Can edit food
- [ ] Can delete food
- [ ] Expired items show correctly
- [ ] Nearly expiring items show correctly

### Backend Tests
- [ ] API is accessible: `https://food-pulse-server.onrender.com`
- [ ] Database connection works
- [ ] Auth endpoints work
- [ ] Food CRUD operations work
- [ ] User isolation works (can't see other users' foods)

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| **Render cold starts slow** | Free tier spins down after 15 min inactivity. First request takes 10-30s. Upgrade to paid for production. |
| **CORS errors** | Ensure backend has correct CORS settings and `FRONTEND_URL` is set. |
| **API 404 errors** | Check Render URL in frontend `.env.production`. Make sure backend is deployed. |
| **Database connection fails** | Check MongoDB Atlas IP whitelist. Add Render IP: `0.0.0.0/0`. |
| **Build fails on Vercel** | Run `npm run build` locally to test. Check for missing dependencies. |
| **Auth not working** | Verify Firebase config in `.env`. Check Firebase rules allow your domain. |

---

## After Deployment

1. **Monitor**
   - Check Render logs for errors
   - Check Vercel analytics
   - Monitor MongoDB usage

2. **Update DNS (Optional)**
   - Set custom domain on Vercel
   - Set custom domain on Render

3. **Continuous Deployment**
   - Vercel and Render auto-deploy on GitHub push
   - No manual deployment needed

4. **Version Control**
   - Keep both repos updated
   - Use meaningful commit messages

---

## Quick Reference URLs

- **Frontend (Vercel)**: https://food-pulse.vercel.app
- **Backend (Render)**: https://food-pulse-server.onrender.com
- **GitHub Frontend**: https://github.com/YOUR_USERNAME/food-pulse
- **GitHub Backend**: https://github.com/YOUR_USERNAME/food-pulse-server
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Firebase Console**: https://console.firebase.google.com
