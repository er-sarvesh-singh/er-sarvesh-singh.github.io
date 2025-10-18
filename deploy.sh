#!/usr/bin/env sh

# abort on errors
set -e

echo "Building the project..."
npm run build

echo "Build completed successfully!"
echo ""
echo "To deploy to GitHub Pages:"
echo "1. Commit and push your changes to the main branch"
echo "2. GitHub Actions will automatically deploy your site"
echo ""
echo "Your site will be available at: https://er-sarvesh-singh.github.io/"
echo ""
echo "You can monitor the deployment progress in the Actions tab of your repository."