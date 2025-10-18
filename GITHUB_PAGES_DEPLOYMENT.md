# GitHub Pages Deployment Guide

This guide will help you deploy your React/Vite portfolio to GitHub Pages.

## Prerequisites

1. Your repository name should be `<username>.github.io` (which yours already is: `Sarvesh18.github.io`)
2. You have push access to the main branch

## Automatic Deployment (Recommended)

The project is configured with GitHub Actions for automatic deployment. Every push to the `main` branch will trigger a deployment.

### Setup Steps:

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" in the left sidebar
   - Under "Build and deployment", select:
     - Source: `GitHub Actions`

2. **Push your code:**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

3. **Monitor the deployment:**
   - Go to the "Actions" tab in your repository
   - You'll see the "Deploy to GitHub Pages" workflow running
   - Once completed (usually takes 2-3 minutes), your site will be live at:
     `https://sarvesh18.github.io/`

## Manual Deployment (Alternative)

If you prefer manual deployment, you can use the gh-pages package:

1. **Install gh-pages (if not already installed):**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Deploy manually:**
   ```bash
   npm run deploy
   ```

## Important Configuration

Your project is already configured correctly for GitHub Pages:

1. ✅ `vite.config.ts` has `base: './'` set
2. ✅ GitHub Actions workflow is configured
3. ✅ Build output goes to `dist` folder

## Troubleshooting

### Site not loading properly?

1. **Check the base URL:** Make sure `base: './'` is set in `vite.config.ts`
2. **Clear cache:** Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. **Check Actions:** Ensure the GitHub Actions workflow completed successfully

### 404 errors on refresh?

This is normal for SPAs. GitHub Pages doesn't support client-side routing by default. Solutions:
- Use hash routing instead of browser routing
- Add a 404.html that redirects to index.html
- Use a custom domain with proper server configuration

### Build failing?

1. Check the Actions tab for error logs
2. Ensure all dependencies are in `package.json` (not just devDependencies)
3. Test the build locally: `npm run build`

## Custom Domain (Optional)

To use a custom domain:

1. Create a `CNAME` file in the `public` folder with your domain:
   ```
   portfolio.yourdomain.com
   ```

2. Configure your domain's DNS:
   - Add a CNAME record pointing to `sarvesh18.github.io`
   - Or add A records pointing to GitHub's IPs

3. Enable HTTPS in repository settings after DNS propagation

## Updating Content

1. Make your changes locally
2. Test with `npm run dev`
3. Commit and push to main branch
4. GitHub Actions will automatically deploy

## Performance Tips

1. The build is already optimized with:
   - Code splitting
   - Minification
   - Tree shaking
   - PWA support

2. Images are served from the `public` folder for optimal caching

## Security Notes

- Never commit sensitive data (API keys, passwords)
- The `drop_console: true` in build removes console.logs in production
- GitHub Pages sites are always public

---

Your site should be live at: https://sarvesh18.github.io/

For issues, check the Actions tab in your repository for deployment logs.