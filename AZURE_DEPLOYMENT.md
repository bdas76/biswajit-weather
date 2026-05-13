# 🚀 Azure Deployment Guide - Hourly Weather Forecast App

This guide provides step-by-step instructions to deploy your Weather Forecast application to Azure Static Web Apps.

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ An Azure account ([Create free account](https://azure.microsoft.com/free/))
- ✅ A GitHub account
- ✅ Git installed on your local machine
- ✅ Your application code ready

## 🎯 Deployment Options

### Option 1: Deploy via Azure Portal (Recommended for Beginners)

#### Step 1: Push Code to GitHub

1. **Create a new GitHub repository**
   - Go to [GitHub](https://github.com/new)
   - Name your repository: `biswajit-weather`
   - Choose Public or Private
   - Click "Create repository"

2. **Push your code to GitHub**
   ```bash
   # Initialize git (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Commit changes
   git commit -m "Initial commit - Biswajit Weather App"
   
   # Add remote repository (replace YOUR_USERNAME with your GitHub username)
   git remote add origin https://github.com/YOUR_USERNAME/biswajit-weather.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

#### Step 2: Create Azure Static Web App

1. **Sign in to Azure Portal**
   - Go to [Azure Portal](https://portal.azure.com)
   - Sign in with your Azure account

2. **Create Static Web App**
   - Click "Create a resource"
   - Search for "Static Web Apps"
   - Click "Create"

3. **Configure Basic Settings**
   - **Subscription**: Select your Azure subscription
   - **Resource Group**: Create new or select existing (e.g., `biswajit-weather-rg`)
   - **Name**: Enter `biswajit-weather` (or add suffix if taken: `biswajit-weather-app`)
   - **Plan type**: Select "Free" (perfect for this app)
   - **Region**: Choose closest to your users (e.g., East US, West Europe, or Central India)
   - **Deployment source**: Select "GitHub"

4. **Authorize GitHub**
   - Click "Sign in with GitHub"
   - Authorize Azure Static Web Apps
   - Select your organization/account

5. **Configure Build Details**
   - **Organization**: Your GitHub username/organization
   - **Repository**: Select `biswajit-weather`
   - **Branch**: Select `main` or `master`
   - **Build Presets**: Select "Custom"
   - **App location**: `/` (root directory)
   - **Api location**: Leave empty
   - **Output location**: Leave empty

6. **Review and Create**
   - Click "Review + create"
   - Review your settings
   - Click "Create"

7. **Wait for Deployment**
   - Azure will create the resource (1-2 minutes)
   - GitHub Actions workflow will be automatically created
   - Initial deployment will start automatically (2-3 minutes)

#### Step 3: Access Your Deployed App

1. **Get Your App URL**
   - Go to your Static Web App resource in Azure Portal
   - Find the URL in the "Overview" section
   - It will look like: `https://biswajit-weather.azurestaticapps.net`

2. **Test Your Application**
   - Click the URL to open your app
   - Test location search functionality
   - Test geolocation feature (requires HTTPS ✅)

### Option 2: Deploy via Azure CLI

#### Prerequisites
- Install [Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli)
- Install [Azure Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/)

#### Steps

1. **Login to Azure**
   ```bash
   az login
   ```

2. **Create Resource Group**
   ```bash
   az group create \
     --name biswajit-weather-rg \
     --location eastus
   ```

3. **Create Static Web App**
   ```bash
   az staticwebapp create \
     --name biswajit-weather \
     --resource-group biswajit-weather-rg \
     --source https://github.com/YOUR_USERNAME/biswajit-weather \
     --location eastus \
     --branch main \
     --app-location "/" \
     --login-with-github
   ```

4. **Get Deployment Token**
   ```bash
   az staticwebapp secrets list \
     --name biswajit-weather \
     --resource-group biswajit-weather-rg
   ```

5. **Add Token to GitHub Secrets**
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Value: Paste the token from step 4
   - Click "Add secret"

### Option 3: Deploy via VS Code Extension

1. **Install Azure Static Web Apps Extension**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Azure Static Web Apps"
   - Install the extension

2. **Sign in to Azure**
   - Click Azure icon in sidebar
   - Click "Sign in to Azure"
   - Follow authentication prompts

3. **Deploy**
   - Right-click on your project folder
   - Select "Deploy to Static Web App"
   - Follow the prompts to create/select resource
   - Choose your GitHub repository
   - Configure build settings

## 🔧 Configuration Files

The following files are included for Azure deployment:

### 1. `staticwebapp.config.json`
Configures routing, headers, and caching for Azure Static Web Apps.

**Key Features:**
- ✅ Proper caching for static assets
- ✅ Security headers (XSS protection, frame options)
- ✅ Geolocation permissions
- ✅ SPA routing fallback

### 2. `.github/workflows/azure-static-web-apps.yml`
GitHub Actions workflow for automatic deployment.

**Triggers:**
- ✅ Push to main/master branch
- ✅ Pull requests
- ✅ Automatic preview deployments for PRs

## 🔄 Continuous Deployment

Once set up, your app will automatically deploy when you push changes:

```bash
# Make changes to your code
git add .
git commit -m "Update weather app"
git push origin main

# GitHub Actions will automatically:
# 1. Build your app
# 2. Deploy to Azure
# 3. Update your live site (2-3 minutes)
```

## 🌐 Custom Domain Setup

### Add Custom Domain

1. **In Azure Portal**
   - Go to your Static Web App
   - Click "Custom domains" in the left menu
   - Click "Add"
   - Choose "Custom domain on other DNS"

2. **Configure DNS**
   - Add CNAME record in your DNS provider:
     ```
     Type: CNAME
     Name: www (or your subdomain)
     Value: your-app-name.azurestaticapps.net
     ```

3. **Validate Domain**
   - Enter your domain in Azure Portal
   - Click "Validate"
   - Wait for DNS propagation (5-30 minutes)

4. **Enable HTTPS**
   - Azure automatically provisions SSL certificate
   - HTTPS will be enabled within 24 hours

## 📊 Monitoring and Analytics

### View Deployment Logs

1. **GitHub Actions**
   - Go to your GitHub repository
   - Click "Actions" tab
   - View deployment history and logs

2. **Azure Portal**
   - Go to your Static Web App
   - Click "Deployment history"
   - View deployment status and details

### Application Insights (Optional)

1. **Create Application Insights**
   ```bash
   az monitor app-insights component create \
     --app weather-app-insights \
     --location eastus \
     --resource-group weather-app-rg
   ```

2. **Get Instrumentation Key**
   ```bash
   az monitor app-insights component show \
     --app weather-app-insights \
     --resource-group weather-app-rg \
     --query instrumentationKey
   ```

3. **Add to Your App**
   - Add Application Insights JavaScript snippet to `index.html`

## 🔒 Security Best Practices

### Environment Variables (For API Keys)

⚠️ **Important**: Your WeatherAPI key is currently exposed in `script.js`

**Recommended Solution:**

1. **Create Azure Function (API Proxy)**
   ```bash
   # Create function app
   az functionapp create \
     --name weather-api-proxy \
     --resource-group weather-app-rg \
     --consumption-plan-location eastus \
     --runtime node \
     --functions-version 4
   ```

2. **Store API Key in Azure**
   ```bash
   az functionapp config appsettings set \
     --name weather-api-proxy \
     --resource-group weather-app-rg \
     --settings WEATHER_API_KEY=your_api_key_here
   ```

3. **Update Your App**
   - Modify `script.js` to call your Azure Function instead of WeatherAPI directly
   - Azure Function will add the API key server-side

### Configure Security Headers

Already configured in `staticwebapp.config.json`:
- ✅ X-Content-Type-Options: nosniff
- ✅ X-Frame-Options: DENY
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ Permissions-Policy: geolocation=(self)

## 💰 Cost Estimation

### Azure Static Web Apps Pricing

**Free Tier** (Perfect for this app):
- ✅ 100 GB bandwidth/month
- ✅ 0.5 GB storage
- ✅ Custom domains
- ✅ Free SSL certificates
- ✅ Global CDN
- ✅ Staging environments
- ✅ **Cost: $0/month**

**Standard Tier** (If you need more):
- ✅ 100 GB bandwidth included
- ✅ Additional bandwidth: $0.20/GB
- ✅ **Cost: $9/month + usage**

**Estimated Monthly Cost for This App:**
- Free tier is sufficient for most use cases
- Expected traffic: < 10,000 users/month = **$0**

## 🐛 Troubleshooting

### Deployment Fails

**Problem**: GitHub Actions workflow fails

**Solutions:**
1. Check GitHub Actions logs for errors
2. Verify `AZURE_STATIC_WEB_APPS_API_TOKEN` secret is set
3. Ensure repository permissions are correct
4. Re-generate deployment token in Azure Portal

### App Not Loading

**Problem**: Site shows 404 or blank page

**Solutions:**
1. Check deployment status in Azure Portal
2. Verify all files are committed to GitHub
3. Check browser console for errors
4. Clear browser cache and try again

### Geolocation Not Working

**Problem**: Location button doesn't work

**Solutions:**
1. Verify app is served over HTTPS (Azure provides this automatically)
2. Check browser permissions
3. Test in different browsers

### API Rate Limiting

**Problem**: Weather data not loading after many requests

**Solutions:**
1. Implement API proxy with Azure Functions
2. Add caching to reduce API calls
3. Monitor API usage in WeatherAPI dashboard

## 📈 Scaling and Performance

### Enable CDN (Already Included)
Azure Static Web Apps includes global CDN automatically:
- ✅ Content cached at edge locations worldwide
- ✅ Reduced latency for global users
- ✅ Automatic HTTPS

### Optimize Performance

1. **Enable Compression** (Already configured)
   - Gzip compression enabled by default
   - Reduces file sizes by 70-80%

2. **Cache Static Assets** (Already configured)
   - CSS, JS, images cached for 1 year
   - HTML not cached for instant updates

3. **Lazy Load Images** (Already implemented)
   - Weather icons load on-demand
   - Reduces initial page load time

## 🔄 Rollback Deployment

If you need to rollback to a previous version:

1. **Via Azure Portal**
   - Go to Static Web App → Deployment history
   - Find previous successful deployment
   - Click "Redeploy"

2. **Via Git**
   ```bash
   # Revert to previous commit
   git revert HEAD
   git push origin main
   
   # Or reset to specific commit
   git reset --hard <commit-hash>
   git push origin main --force
   ```

## 📚 Additional Resources

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Azure CLI Reference](https://docs.microsoft.com/cli/azure/)
- [Custom Domains Guide](https://docs.microsoft.com/azure/static-web-apps/custom-domain)
- [Azure Free Account](https://azure.microsoft.com/free/)

## 🎉 Success Checklist

After deployment, verify:

- ✅ App loads at Azure URL
- ✅ HTTPS is enabled (automatic)
- ✅ Location search works
- ✅ Geolocation button works
- ✅ Weather data displays correctly
- ✅ Responsive design works on mobile
- ✅ GitHub Actions workflow runs successfully
- ✅ Custom domain configured (optional)

## 🆘 Support

If you encounter issues:

1. Check Azure Portal for deployment status
2. Review GitHub Actions logs
3. Check browser console for errors
4. Verify all configuration files are present
5. Contact Azure Support (available with free account)

---

**Deployment Time**: ~10 minutes
**Difficulty**: Beginner-friendly
**Cost**: Free (with Azure Free Tier)

**Made with ❤️ for Azure deployment**

*Last updated: May 2026*