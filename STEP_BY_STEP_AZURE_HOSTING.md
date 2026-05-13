# 📋 Step-by-Step Guide: Host Biswajit Weather App on Azure

This is a complete, beginner-friendly guide to host your weather application on Azure Static Web Apps.

---

## 🎯 What You'll Need

Before starting, make sure you have:
- ✅ A computer with internet connection
- ✅ Your weather app files (already in this folder)
- ✅ A GitHub account (free) - [Sign up here](https://github.com/signup)
- ✅ An Azure account (free) - [Sign up here](https://azure.microsoft.com/free/)
- ✅ Git installed on your computer - [Download here](https://git-scm.com/downloads)

**Time Required**: 15-20 minutes
**Cost**: $0 (Free tier)

---

## 📝 PART 1: Push Your Code to GitHub (5 minutes)

### Step 1.1: Create a GitHub Account (if you don't have one)

1. Go to [https://github.com/signup](https://github.com/signup)
2. Enter your email address
3. Create a password
4. Choose a username
5. Verify your account via email
6. Complete the setup

### Step 1.2: Create a New Repository on GitHub

1. **Go to GitHub** and sign in
2. **Click the "+" icon** in the top-right corner
3. **Select "New repository"**
4. **Fill in the details:**
   - Repository name: `biswajit-weather`
   - Description: `Hourly Weather Forecast Application`
   - Choose: **Public** (recommended) or Private
   - **DO NOT** check "Initialize this repository with a README"
   - Click **"Create repository"**

5. **Keep this page open** - you'll need the commands shown

### Step 1.3: Push Your Code to GitHub

1. **Open Command Prompt (Windows) or Terminal (Mac/Linux)**
   - Windows: Press `Win + R`, type `cmd`, press Enter
   - Mac: Press `Cmd + Space`, type `terminal`, press Enter

2. **Navigate to your project folder:**
   ```bash
   cd "c:\Users\BiswajitDas\Documents\Watsonx Orchestrate\Custom Agent SDK\Project_POC"
   ```

3. **Initialize Git (if not already done):**
   ```bash
   git init
   ```

4. **Add all files:**
   ```bash
   git add .
   ```

5. **Commit your files:**
   ```bash
   git commit -m "Initial commit - Biswajit Weather App"
   ```

6. **Set the main branch:**
   ```bash
   git branch -M main
   ```

7. **Add your GitHub repository as remote:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/biswajit-weather.git
   ```
   ⚠️ **Replace `YOUR_USERNAME`** with your actual GitHub username

8. **Push to GitHub:**
   ```bash
   git push -u origin main
   ```
   
   - If prompted, enter your GitHub username and password
   - **Note**: You may need to use a Personal Access Token instead of password
     - Go to GitHub → Settings → Developer settings → Personal access tokens → Generate new token
     - Give it "repo" permissions
     - Use this token as your password

9. **Verify Upload:**
   - Go back to your GitHub repository page
   - Refresh the page
   - You should see all your files uploaded

✅ **Part 1 Complete!** Your code is now on GitHub.

---

## 🌐 PART 2: Create Azure Account (3 minutes)

### Step 2.1: Sign Up for Azure Free Account

1. **Go to** [https://azure.microsoft.com/free/](https://azure.microsoft.com/free/)
2. **Click "Start free"**
3. **Sign in** with your Microsoft account (or create one)
4. **Fill in your details:**
   - Country/Region
   - First name and Last name
   - Email address
   - Phone number
5. **Verify your identity:**
   - Enter phone number
   - Verify via SMS or call
6. **Add payment information:**
   - ⚠️ Don't worry - you won't be charged for free tier
   - Credit/debit card required for verification only
   - You'll get $200 free credit for 30 days
7. **Agree to terms** and click "Sign up"
8. **Wait for account creation** (1-2 minutes)

✅ **Part 2 Complete!** Your Azure account is ready.

---

## ☁️ PART 3: Deploy to Azure Static Web Apps (7 minutes)

### Step 3.1: Access Azure Portal

1. **Go to** [https://portal.azure.com](https://portal.azure.com)
2. **Sign in** with your Azure account
3. You'll see the Azure Portal dashboard

### Step 3.2: Create a Static Web App

1. **Click "Create a resource"** (top-left corner or center of page)

2. **Search for "Static Web Apps"**
   - Type in the search box: `Static Web Apps`
   - Click on "Static Web Apps" from results
   - Click **"Create"**

### Step 3.3: Configure Basic Settings

Fill in the **Basics** tab:

1. **Subscription:**
   - Select your subscription (usually "Free Trial" or "Pay-As-You-Go")

2. **Resource Group:**
   - Click "Create new"
   - Name: `biswajit-weather-rg`
   - Click "OK"

3. **Static Web App details:**
   - **Name**: `biswajit-weather`
   - **Plan type**: Select **"Free"**
   - **Region for Azure Functions API**: Choose closest to you
     - For India: Select "Central India" or "East Asia"
     - For US: Select "East US 2" or "West US 2"
     - For Europe: Select "West Europe"

4. **Deployment details:**
   - **Source**: Select **"GitHub"**
   - Click **"Sign in with GitHub"**

### Step 3.4: Authorize GitHub

1. **GitHub Authorization popup will appear**
2. **Click "Authorize Azure-App-Service-Static-Web-Apps"**
3. **Enter your GitHub password** if prompted
4. **Wait for authorization** (few seconds)

### Step 3.5: Configure GitHub Repository

After authorization, you'll see:

1. **Organization:**
   - Select your GitHub username

2. **Repository:**
   - Select **"biswajit-weather"** from dropdown

3. **Branch:**
   - Select **"main"** (or "master" if that's your branch name)

### Step 3.6: Configure Build Details

1. **Build Presets:**
   - Select **"Custom"** from dropdown

2. **App location:**
   - Enter: `/`
   - (This means root directory)

3. **Api location:**
   - Leave **empty** (no API for this app)

4. **Output location:**
   - Leave **empty** (no build process needed)

### Step 3.7: Review and Create

1. **Click "Review + create"** (bottom of page)

2. **Review your settings:**
   - Name: biswajit-weather
   - Plan: Free
   - Repository: biswajit-weather
   - Branch: main

3. **Click "Create"** (bottom of page)

4. **Wait for deployment** (1-2 minutes)
   - You'll see "Deployment is in progress"
   - Wait until it says "Your deployment is complete"

✅ **Part 3 Complete!** Your Azure resource is created.

---

## 🚀 PART 4: Wait for Automatic Deployment (3 minutes)

### Step 4.1: View Your Resource

1. **Click "Go to resource"** button
2. You'll see your Static Web App overview page

### Step 4.2: Check Deployment Status

1. **Look for the URL** in the overview page
   - It will be: `https://biswajit-weather.azurestaticapps.net`
   - Or similar with random suffix if name was taken

2. **Check GitHub Actions:**
   - Go to your GitHub repository
   - Click the **"Actions"** tab
   - You'll see a workflow running: "Azure Static Web Apps CI/CD"
   - **Wait for it to complete** (green checkmark) - takes 2-3 minutes

### Step 4.3: Monitor Deployment

**In Azure Portal:**
1. In your Static Web App page
2. Click **"GitHub Action runs"** in left menu
3. You'll see the deployment status

**What's happening:**
- Azure automatically created a GitHub Actions workflow
- It's building and deploying your app
- First deployment takes 2-3 minutes

✅ **Part 4 Complete!** Deployment is in progress.

---

## 🎉 PART 5: Access Your Live Application (1 minute)

### Step 5.1: Get Your URL

1. **In Azure Portal**, on your Static Web App page
2. **Look for "URL"** in the overview section
3. **Copy the URL**: `https://biswajit-weather.azurestaticapps.net`

### Step 5.2: Open Your App

1. **Click the URL** or paste it in your browser
2. **Your weather app should load!**

### Step 5.3: Test Your App

1. **Test Location Search:**
   - Type "London" in the search box
   - Click "Search"
   - You should see 24-hour weather forecast

2. **Test Geolocation:**
   - Click the 📍 button
   - Allow location access when prompted
   - You should see weather for your current location

3. **Test on Mobile:**
   - Open the URL on your phone
   - Everything should work perfectly

✅ **Part 5 Complete!** Your app is LIVE! 🎊

---

## 📱 Your App is Now Live!

**Your URL:** `https://biswajit-weather.azurestaticapps.net`

**Share it with:**
- Friends and family
- On social media
- In your portfolio
- On your resume

---

## 🔄 How to Update Your App

Whenever you make changes to your code:

1. **Save your changes** in VS Code or your editor

2. **Open Command Prompt/Terminal** in your project folder

3. **Run these commands:**
   ```bash
   git add .
   git commit -m "Updated weather app"
   git push
   ```

4. **Wait 2-3 minutes** - Azure automatically deploys your changes!

5. **Refresh your browser** to see the updates

---

## 🎨 Optional: Add a Custom Domain

If you have your own domain (like `biswajitweather.com`):

### Step 1: In Azure Portal

1. Go to your Static Web App
2. Click **"Custom domains"** in left menu
3. Click **"+ Add"**
4. Select **"Custom domain on other DNS"**
5. Enter your domain name
6. Click **"Next"**

### Step 2: In Your Domain Provider (GoDaddy, Namecheap, etc.)

1. Log in to your domain provider
2. Go to DNS settings
3. Add a CNAME record:
   - **Type**: CNAME
   - **Name**: www (or @ for root domain)
   - **Value**: `biswajit-weather.azurestaticapps.net`
   - **TTL**: 3600 (or default)
4. Save changes

### Step 3: Validate in Azure

1. Back in Azure Portal
2. Click **"Validate"**
3. Wait for DNS propagation (5-30 minutes)
4. Your custom domain will be active!
5. Azure automatically adds free SSL certificate

---

## 📊 Monitor Your App

### View Visitor Statistics

1. **In Azure Portal**, go to your Static Web App
2. Click **"Metrics"** in left menu
3. You can see:
   - Number of requests
   - Data transfer
   - Response times

### View Deployment History

1. Click **"Environments"** in left menu
2. See all your deployments
3. Can rollback to previous versions if needed

---

## 🆘 Troubleshooting

### Problem: "Repository not found" during setup

**Solution:**
- Make sure you authorized Azure to access your GitHub
- Check that repository name is exactly `biswajit-weather`
- Try disconnecting and reconnecting GitHub

### Problem: Deployment fails

**Solution:**
1. Go to GitHub → Your repository → Actions tab
2. Click on the failed workflow
3. Check the error message
4. Common fixes:
   - Make sure all files are committed
   - Check that `staticwebapp.config.json` is present
   - Verify workflow file is in `.github/workflows/` folder

### Problem: App shows blank page

**Solution:**
1. Check browser console (F12) for errors
2. Verify all files are uploaded to GitHub
3. Check that `index.html` is in root directory
4. Clear browser cache and try again

### Problem: Geolocation not working

**Solution:**
- Azure provides HTTPS automatically, so it should work
- Check browser permissions for location access
- Try in a different browser
- Make sure you clicked "Allow" when prompted

### Problem: Weather data not loading

**Solution:**
- Check your internet connection
- Verify the location name is correct
- Check browser console for API errors
- WeatherAPI might be down - try again later

---

## 💰 Cost Information

### What's Free:

- ✅ 100 GB bandwidth per month
- ✅ 0.5 GB storage
- ✅ Custom domains
- ✅ Free SSL certificates
- ✅ Global CDN
- ✅ Unlimited deployments

### When You Might Pay:

- If you exceed 100 GB bandwidth/month (unlikely for personal use)
- If you upgrade to Standard plan (not needed for this app)

### Expected Cost for This App:

**$0/month** - The free tier is more than enough!

---

## 🎓 What You've Learned

Congratulations! You've successfully:

- ✅ Created a GitHub repository
- ✅ Pushed code to GitHub
- ✅ Created an Azure account
- ✅ Deployed a web application to Azure
- ✅ Set up automatic CI/CD with GitHub Actions
- ✅ Got a live URL with HTTPS
- ✅ Learned how to update your app

---

## 📚 Next Steps

### Improve Your App:

1. **Add more features:**
   - 7-day forecast
   - Weather alerts
   - Save favorite locations
   - Dark mode

2. **Customize design:**
   - Change colors in `styles.css`
   - Add your logo
   - Modify layout

3. **Add analytics:**
   - Google Analytics
   - Azure Application Insights

### Learn More:

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Web Development Tutorials](https://www.w3schools.com/)

---

## 🎉 Congratulations!

Your **Biswajit Weather** app is now live on the internet!

**Your Live URL:** `https://biswajit-weather.azurestaticapps.net`

Share it with the world! 🌍

---

## 📞 Need Help?

If you get stuck:

1. **Check the error message** carefully
2. **Google the error** - someone else probably had the same issue
3. **Check Azure documentation** - very comprehensive
4. **Ask on Stack Overflow** - tag with `azure-static-web-apps`
5. **Review this guide again** - you might have missed a step

---

**Made with ❤️ by Biswajit Das**

*Last updated: May 2026*