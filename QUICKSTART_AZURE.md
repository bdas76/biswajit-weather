# ⚡ Quick Start - Deploy to Azure in 5 Minutes

The fastest way to get your Weather Forecast app live on Azure!

## 🎯 Prerequisites

- Azure account ([Get free account](https://azure.microsoft.com/free/))
- GitHub account
- Your code in a GitHub repository

## 🚀 Deploy Now (3 Steps)

### Step 1: Push to GitHub (2 minutes)

```bash
# In your project folder
git init
git add .
git commit -m "Initial commit - Biswajit Weather App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/biswajit-weather.git
git push -u origin main
```

### Step 2: Create Azure Static Web App (2 minutes)

1. Go to [Azure Portal](https://portal.azure.com)
2. Click **"Create a resource"** → Search **"Static Web Apps"** → **Create**
3. Fill in:
   - **Name**: `biswajit-weather`
   - **Region**: Choose closest to you (e.g., Central India, East US)
   - **Plan**: **Free**
   - **Source**: **GitHub**
   - **Repository**: Select `biswajit-weather`
   - **Branch**: `main`
   - **App location**: `/`
   - Leave API and Output locations empty
4. Click **"Review + create"** → **Create**

### Step 3: Wait for Deployment (1 minute)

- Azure automatically deploys your app
- Get your URL from Azure Portal: `https://biswajit-weather.azurestaticapps.net`
- Done! 🎉

## ✅ Verify Deployment

Visit your Azure URL and test:
- ✅ Search for a city (e.g., "London")
- ✅ Click the 📍 button for geolocation
- ✅ View 24-hour forecast

## 🔄 Update Your App

```bash
# Make changes to your code
git add .
git commit -m "Update Biswajit Weather app"
git push

# Azure auto-deploys in 2-3 minutes!
```

## 📚 Need More Details?

See [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md) for:
- Custom domains
- Security configuration
- Monitoring setup
- Troubleshooting

## 🆘 Issues?

1. Check GitHub Actions tab for deployment logs
2. Verify Azure deployment status in portal
3. See [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md) troubleshooting section

---

**Total Time**: ~5 minutes
**Cost**: Free
**Difficulty**: ⭐ Easy