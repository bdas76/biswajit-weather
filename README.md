# 🌤️ Hourly Weather Forecast Application

A beautiful, responsive web application that provides detailed 24-hour weather forecasts for any location worldwide. Features include manual location search and automatic geolocation detection.

![Weather App](https://img.shields.io/badge/Status-Ready-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### Core Functionality
- 📍 **Geolocation Support** - One-click location detection using GPS
- 🔍 **Manual Search** - Search by city name, ZIP code, or coordinates
- ⏰ **24-Hour Forecast** - Detailed hourly weather predictions
- 🌡️ **Dual Temperature** - Display in both Celsius and Fahrenheit
- 🎨 **Beautiful UI** - Modern, gradient design with smooth animations
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- ⚡ **Real-time Data** - Live weather information from WeatherAPI.com

### Weather Information Displayed
For each hour, the app shows:
- 🕐 Time (12-hour format)
- 🌡️ Temperature (°C and °F)
- ☁️ Weather condition with icon
- 💧 Humidity percentage
- 💨 Wind speed and direction
- 🌧️ Chance of rain
- ❄️ Chance of snow

## 🚀 Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- (Optional) HTTPS for geolocation in production

### Installation

1. **Download the files**
   ```bash
   # Clone or download these files to a folder:
   - index.html
   - styles.css
   - script.js
   ```

2. **Open the application**
   - Simply double-click `index.html`, or
   - Right-click `index.html` → Open with → Your browser, or
   - Use a local server (recommended for development)

3. **Start using**
   - Enter a location and click Search, or
   - Click the 📍 button to use your current location

### Using a Local Server (Optional)

For the best experience, especially when testing geolocation:

**Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Node.js:**
```bash
npx http-server
```

**VS Code:**
- Install "Live Server" extension
- Right-click `index.html` → Open with Live Server

Then visit: `http://localhost:8000`

## 📖 Usage Guide

### Method 1: Manual Location Search

1. Type a location in the search box:
   - **City name**: "London", "New York", "Tokyo"
   - **City with country**: "Paris, France"
   - **ZIP code**: "10001", "SW1A 1AA"
   - **Coordinates**: "40.7128,-74.0060"

2. Click the **Search** button or press **Enter**

3. View the 24-hour forecast displayed in cards

### Method 2: Geolocation (Auto-detect)

1. Click the **📍 location button**

2. Allow location access when prompted by your browser

3. The app will automatically fetch weather for your current location

4. View your local 24-hour forecast

### Understanding the Forecast Cards

Each hourly card displays:

```
┌─────────────────────┐
│   3:00 PM          │  ← Time
│   [Weather Icon]   │  ← Visual condition
│   25°C / 77°F      │  ← Temperature
│   Partly cloudy    │  ← Condition
│   ─────────────    │
│   💧 Humidity: 65% │  ← Details
│   💨 Wind: 15 km/h │
│   🌧️ Rain: 20%    │
└─────────────────────┘
```

The current hour is highlighted with a blue border.

## 🎯 Features in Detail

### Geolocation
- **Browser API**: Uses HTML5 Geolocation API
- **Permissions**: Requests user permission before accessing location
- **Accuracy**: High accuracy mode enabled
- **Fallback**: Manual search available if geolocation fails
- **Privacy**: Location data sent only to WeatherAPI, not stored

### Error Handling
The app handles various error scenarios:
- ❌ Invalid location names
- ❌ Network connectivity issues
- ❌ API rate limiting
- ❌ Geolocation permission denied
- ❌ Geolocation unavailable
- ❌ Timeout errors

### Responsive Design
- **Desktop** (>768px): Multi-column grid layout
- **Tablet** (768px): 2-3 columns
- **Mobile** (<768px): Single/dual column, optimized touch targets

## 🔧 Configuration

### API Key
The application uses WeatherAPI.com. The API key is configured in `script.js`:

```javascript
const CONFIG = {
    API_KEY: 'bede3b3cd1be483eb17120616262303',
    BASE_URL: 'http://api.weatherapi.com/v1',
    FORECAST_DAYS: 1
};
```

**⚠️ Security Note**: The API key is visible in the frontend code. For production:
- Use a backend proxy to hide the API key
- Implement rate limiting
- Restrict API key to specific domains in WeatherAPI dashboard

### Customization

**Change color scheme** (`styles.css`):
```css
:root {
    --primary-color: #2563eb;    /* Main blue */
    --secondary-color: #10b981;  /* Green for geolocation */
    --bg-color: #f8fafc;         /* Background */
}
```

**Modify forecast days** (`script.js`):
```javascript
FORECAST_DAYS: 1  // Change to 2 or 3 for multi-day forecast
```

## 🌐 Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Basic App | ✅ 5+ | ✅ 3.5+ | ✅ 5+ | ✅ 12+ |
| Geolocation | ✅ 5+ | ✅ 3.5+ | ✅ 5+ | ✅ 12+ |
| Fetch API | ✅ 42+ | ✅ 39+ | ✅ 10.1+ | ✅ 14+ |

**Note**: Geolocation requires HTTPS in production (except localhost).

## 📱 Mobile Support

The app is fully optimized for mobile devices:
- ✅ Touch-friendly buttons and inputs
- ✅ Responsive grid layout
- ✅ Optimized font sizes
- ✅ Fast loading with lazy-loaded images
- ✅ Works offline after initial load (cached assets)

## 🐛 Troubleshooting

### Geolocation Not Working
**Problem**: Location button doesn't work
**Solutions**:
- Ensure you're using HTTPS (or localhost)
- Check browser location permissions
- Enable location services on your device
- Try a different browser

### Weather Data Not Loading
**Problem**: Search returns an error
**Solutions**:
- Check your internet connection
- Verify the location name is correct
- Try a different location format (city, ZIP, coordinates)
- Check browser console for detailed errors

### API Rate Limit
**Problem**: "Too many requests" error
**Solutions**:
- Wait a few minutes before trying again
- WeatherAPI free tier: 1 million calls/month
- Consider upgrading API plan for high traffic

### Display Issues
**Problem**: Layout looks broken
**Solutions**:
- Clear browser cache
- Ensure all files (HTML, CSS, JS) are in the same folder
- Check browser console for missing file errors
- Try a different browser

## 📊 API Information

### WeatherAPI.com
- **Website**: https://www.weatherapi.com/
- **Documentation**: https://www.weatherapi.com/docs/
- **Free Tier**: 1 million calls/month
- **Data Updates**: Hourly

### Endpoints Used
- `GET /forecast.json` - Hourly forecast data

### Rate Limits
- Free tier: 1,000,000 calls/month
- Approximately 33,333 calls/day
- No per-second limit on free tier

## 🔒 Privacy & Security

### Data Collection
- **Location**: Only collected when user clicks geolocation button
- **Storage**: No data stored locally or on servers
- **Transmission**: Location sent only to WeatherAPI.com
- **Cookies**: None used

### Security Recommendations
For production deployment:
1. Use HTTPS (required for geolocation)
2. Implement backend API proxy
3. Add rate limiting
4. Restrict API key to your domain
5. Monitor API usage

## 🚀 Deployment

### Azure Static Web Apps (Recommended) ⭐

**Why Azure?**
- ✅ Free tier with 100GB bandwidth
- ✅ Automatic HTTPS and global CDN
- ✅ GitHub Actions CI/CD included
- ✅ Custom domains with free SSL
- ✅ Perfect for this application

**Quick Deploy (5 minutes):**

See [QUICKSTART_AZURE.md](./QUICKSTART_AZURE.md) for the fastest deployment method.

**Detailed Guide:**

See [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md) for comprehensive instructions including:
- Step-by-step Azure Portal deployment
- Azure CLI deployment
- VS Code extension deployment
- Custom domain setup
- Security configuration
- Monitoring and analytics
- Troubleshooting guide

**Quick Steps:**
1. Push code to GitHub repository named `biswajit-weather`
2. Create Azure Static Web App in [Azure Portal](https://portal.azure.com)
3. Name it `biswajit-weather` and connect to your GitHub repository
4. Deploy automatically via GitHub Actions
5. Get your live URL: `https://biswajit-weather.azurestaticapps.net`

**Files Included:**
- `staticwebapp.config.json` - Azure configuration
- `.github/workflows/azure-static-web-apps.yml` - CI/CD workflow
- `AZURE_DEPLOYMENT.md` - Complete deployment guide
- `QUICKSTART_AZURE.md` - 5-minute quick start

### GitHub Pages
1. Create a GitHub repository
2. Upload all files
3. Go to Settings → Pages
4. Select main branch
5. Your app will be live at `https://username.github.io/repo-name`

### Netlify
1. Drag and drop your folder to Netlify
2. Your app is instantly deployed
3. Get a free HTTPS URL

### Vercel
```bash
npm i -g vercel
vercel
```

## 🎨 Screenshots

### Desktop View
```
┌────────────────────────────────────────────────────────┐
│  🌤️ Hourly Weather Forecast                           │
│  Get detailed hourly weather information               │
├────────────────────────────────────────────────────────┤
│  [Enter location...] [📍] [Search]                    │
├────────────────────────────────────────────────────────┤
│  📍 New York, New York, United States                  │
│  24-Hour Weather Forecast                              │
├────────────────────────────────────────────────────────┤
│  [12AM] [1AM] [2AM] [3AM] [4AM] [5AM] ...            │
│  [Card] [Card] [Card] [Card] [Card] [Card] ...        │
└────────────────────────────────────────────────────────┘
```

### Mobile View
```
┌──────────────────┐
│  🌤️ Hourly       │
│  Weather         │
├──────────────────┤
│  [Enter loc...]  │
│  [📍]  [Search]  │
├──────────────────┤
│  📍 London, UK   │
├──────────────────┤
│  [12AM Card]     │
│  [1AM Card]      │
│  [2AM Card]      │
│  ...             │
└──────────────────┘
```

## 🤝 Contributing

Contributions are welcome! Here are some ideas:
- 🌓 Add dark/light theme toggle
- 📅 Extend to 7-day forecast
- 🔔 Add weather alerts
- 💾 Save favorite locations
- 🌍 Add location autocomplete
- 📊 Add weather charts/graphs
- 🌡️ Add "feels like" temperature
- 🌅 Add sunrise/sunset times

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **WeatherAPI.com** - For providing the weather data API
- **Icons** - Weather condition icons from WeatherAPI
- **Design Inspiration** - Modern weather app UIs

## 📞 Support

If you encounter any issues:
1. Check the Troubleshooting section above
2. Review browser console for errors
3. Verify all files are present and correctly named
4. Ensure internet connection is active

## 🔄 Version History

### v1.0.0 (Current)
- ✅ Initial release
- ✅ 24-hour forecast display
- ✅ Geolocation support
- ✅ Manual location search
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states
- ✅ Weather icons

## 📚 Additional Resources

- [WeatherAPI Documentation](https://www.weatherapi.com/docs/)
- [MDN Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [HTML5 Geolocation](https://www.w3schools.com/html/html5_geolocation.asp)
- [Responsive Web Design](https://web.dev/responsive-web-design-basics/)

---

**Made with ❤️ for weather enthusiasts**

*Last updated: May 2026*

**Built by Biswajit Das**