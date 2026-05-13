// ===== Configuration =====
const CONFIG = {
    API_KEY: 'bede3b3cd1be483eb17120616262303',
    BASE_URL: 'http://api.weatherapi.com/v1',
    FORECAST_DAYS: 1 // Get 1 day for hourly forecast
};

// ===== DOM Elements =====
const elements = {
    locationInput: document.getElementById('locationInput'),
    geolocateBtn: document.getElementById('geolocateBtn'),
    searchBtn: document.getElementById('searchBtn'),
    messageContainer: document.getElementById('messageContainer'),
    loadingSpinner: document.getElementById('loadingSpinner'),
    locationDisplay: document.getElementById('locationDisplay'),
    forecastSection: document.getElementById('forecastSection'),
    forecastContainer: document.getElementById('forecastContainer')
};

// ===== State Management =====
let currentLocation = null;

// ===== Utility Functions =====

/**
 * Show message to user
 */
function showMessage(message, type = 'info') {
    elements.messageContainer.innerHTML = `
        <div class="message message-${type}">
            ${getMessageIcon(type)}
            <span>${message}</span>
        </div>
    `;
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            elements.messageContainer.innerHTML = '';
        }, 5000);
    }
}

/**
 * Get icon for message type
 */
function getMessageIcon(type) {
    const icons = {
        error: '❌',
        success: '✅',
        info: 'ℹ️',
        warning: '⚠️'
    };
    return icons[type] || icons.info;
}

/**
 * Clear all messages
 */
function clearMessage() {
    elements.messageContainer.innerHTML = '';
}

/**
 * Show loading state
 */
function showLoading(show = true) {
    if (show) {
        elements.loadingSpinner.classList.remove('hidden');
        elements.forecastSection.classList.add('hidden');
        elements.locationDisplay.classList.add('hidden');
    } else {
        elements.loadingSpinner.classList.add('hidden');
    }
}

/**
 * Disable/enable input controls
 */
function setControlsDisabled(disabled) {
    elements.locationInput.disabled = disabled;
    elements.searchBtn.disabled = disabled;
    elements.geolocateBtn.disabled = disabled;
}

/**
 * Validate location input
 */
function validateLocation(location) {
    if (!location || location.trim().length === 0) {
        showMessage('Please enter a location', 'error');
        return false;
    }
    if (location.trim().length < 2) {
        showMessage('Location must be at least 2 characters', 'error');
        return false;
    }
    return true;
}

/**
 * Format time from 24-hour to 12-hour format
 */
function formatTime(timeString) {
    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes} ${ampm}`;
}

/**
 * Get current hour for highlighting
 */
function getCurrentHour() {
    return new Date().getHours();
}

/**
 * Check if hour is current hour
 */
function isCurrentHour(timeString) {
    const hourFromTime = new Date(timeString).getHours();
    return hourFromTime === getCurrentHour();
}

// ===== API Functions =====

/**
 * Fetch weather data from API
 */
async function fetchWeatherData(location) {
    try {
        const url = `${CONFIG.BASE_URL}/forecast.json?key=${CONFIG.API_KEY}&q=${encodeURIComponent(location)}&days=${CONFIG.FORECAST_DAYS}&aqi=no`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Failed to fetch weather data');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

/**
 * Process and display weather data
 */
function displayWeatherData(data) {
    try {
        // Store current location
        currentLocation = {
            name: data.location.name,
            region: data.location.region,
            country: data.location.country
        };
        
        // Display location info
        displayLocationInfo(currentLocation);
        
        // Get hourly forecast
        const hourlyData = data.forecast.forecastday[0].hour;
        
        // Display hourly forecast
        displayHourlyForecast(hourlyData);
        
        // Show forecast section
        elements.forecastSection.classList.remove('hidden');
        
        showMessage('Weather data loaded successfully!', 'success');
    } catch (error) {
        console.error('Display Error:', error);
        showMessage('Error displaying weather data', 'error');
    }
}

/**
 * Display location information
 */
function displayLocationInfo(location) {
    const locationText = location.region 
        ? `${location.name}, ${location.region}, ${location.country}`
        : `${location.name}, ${location.country}`;
    
    elements.locationDisplay.innerHTML = `
        <h2>📍 ${locationText}</h2>
        <p>24-Hour Weather Forecast</p>
    `;
    elements.locationDisplay.classList.remove('hidden');
}

/**
 * Display hourly forecast cards
 */
function displayHourlyForecast(hourlyData) {
    elements.forecastContainer.innerHTML = '';
    
    hourlyData.forEach((hour, index) => {
        const card = createForecastCard(hour, index);
        elements.forecastContainer.appendChild(card);
    });
}

/**
 * Create individual forecast card
 */
function createForecastCard(hourData, index) {
    const card = document.createElement('div');
    card.className = 'forecast-card';
    
    // Highlight current hour
    if (isCurrentHour(hourData.time)) {
        card.style.borderColor = 'var(--primary-color)';
        card.style.backgroundColor = '#eff6ff';
    }
    
    const time = formatTime(hourData.time);
    const tempC = Math.round(hourData.temp_c);
    const tempF = Math.round(hourData.temp_f);
    const condition = hourData.condition.text;
    const icon = hourData.condition.icon;
    const humidity = hourData.humidity;
    const windKph = Math.round(hourData.wind_kph);
    const windDir = hourData.wind_dir;
    const chanceOfRain = hourData.chance_of_rain;
    const chanceOfSnow = hourData.chance_of_snow;
    
    // Determine precipitation display
    let precipitationInfo = '';
    if (chanceOfRain > 0) {
        precipitationInfo = `
            <div class="forecast-detail">
                <span class="forecast-detail-label">🌧️ Rain</span>
                <span class="forecast-detail-value">${chanceOfRain}%</span>
            </div>
        `;
    }
    if (chanceOfSnow > 0) {
        precipitationInfo += `
            <div class="forecast-detail">
                <span class="forecast-detail-label">❄️ Snow</span>
                <span class="forecast-detail-value">${chanceOfSnow}%</span>
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="forecast-time">${time}</div>
        <img src="https:${icon}" alt="${condition}" class="forecast-icon" loading="lazy">
        <div class="forecast-temp">
            ${tempC}°C
            <div class="forecast-temp-f">${tempF}°F</div>
        </div>
        <div class="forecast-condition">${condition}</div>
        <div class="forecast-details">
            <div class="forecast-detail">
                <span class="forecast-detail-label">💧 Humidity</span>
                <span class="forecast-detail-value">${humidity}%</span>
            </div>
            <div class="forecast-detail">
                <span class="forecast-detail-label">💨 Wind</span>
                <span class="forecast-detail-value">${windKph} km/h ${windDir}</span>
            </div>
            ${precipitationInfo}
        </div>
    `;
    
    return card;
}

// ===== Geolocation Functions =====

/**
 * Get user's current location using Geolocation API
 */
function getCurrentLocation() {
    if (!navigator.geolocation) {
        showMessage('Geolocation is not supported by your browser', 'error');
        return;
    }
    
    // Update button state
    elements.geolocateBtn.innerHTML = '⏳';
    elements.geolocateBtn.disabled = true;
    setControlsDisabled(true);
    clearMessage();
    showLoading(true);
    
    navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const coordinates = `${lat},${lon}`;
            
            // Fetch weather for coordinates
            handleWeatherSearch(coordinates);
            
            // Reset button
            elements.geolocateBtn.innerHTML = '📍';
            elements.geolocateBtn.disabled = false;
        },
        // Error callback
        (error) => {
            handleGeolocationError(error);
            elements.geolocateBtn.innerHTML = '📍';
            elements.geolocateBtn.disabled = false;
            setControlsDisabled(false);
            showLoading(false);
        },
        // Options
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

/**
 * Handle geolocation errors
 */
function handleGeolocationError(error) {
    let message = 'Unable to get your location. ';
    
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message += 'Location access was denied. Please enable location permissions or enter a location manually.';
            break;
        case error.POSITION_UNAVAILABLE:
            message += 'Location information is unavailable. Please try again or enter a location manually.';
            break;
        case error.TIMEOUT:
            message += 'Location request timed out. Please try again or enter a location manually.';
            break;
        default:
            message += 'An unknown error occurred. Please enter a location manually.';
    }
    
    showMessage(message, 'error');
}

// ===== Main Search Function =====

/**
 * Handle weather search
 */
async function handleWeatherSearch(location) {
    try {
        // Validate input if it's from manual entry
        if (location === elements.locationInput.value && !validateLocation(location)) {
            return;
        }
        
        // Clear previous messages
        clearMessage();
        
        // Show loading state
        showLoading(true);
        setControlsDisabled(true);
        
        // Fetch weather data
        const data = await fetchWeatherData(location);
        
        // Display weather data
        displayWeatherData(data);
        
    } catch (error) {
        showMessage(error.message || 'Failed to fetch weather data. Please check the location and try again.', 'error');
    } finally {
        // Hide loading state
        showLoading(false);
        setControlsDisabled(false);
    }
}

// ===== Event Listeners =====

/**
 * Search button click handler
 */
elements.searchBtn.addEventListener('click', () => {
    const location = elements.locationInput.value.trim();
    handleWeatherSearch(location);
});

/**
 * Input field enter key handler
 */
elements.locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const location = elements.locationInput.value.trim();
        handleWeatherSearch(location);
    }
});

/**
 * Geolocation button click handler
 */
elements.geolocateBtn.addEventListener('click', () => {
    getCurrentLocation();
});

/**
 * Input field focus handler - clear error messages
 */
elements.locationInput.addEventListener('focus', () => {
    clearMessage();
});

// ===== Initialization =====

/**
 * Initialize the application
 */
function init() {
    console.log('Weather Forecast App initialized');
    
    // Check if geolocation is supported
    if (!navigator.geolocation) {
        elements.geolocateBtn.disabled = true;
        elements.geolocateBtn.title = 'Geolocation not supported';
    }
    
    // Set focus on input field
    elements.locationInput.focus();
    
    // Show welcome message
    showMessage('Enter a location or use your current location to get started', 'info');
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Made with Bob
