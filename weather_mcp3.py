from mcp.server.fastmcp import FastMCP
import requests
import os

mcp = FastMCP("weather")

# ? Read API key from environment
API_KEY = "bede3b3cd1be483eb17120616262303"

BASE_URL = "http://api.weatherapi.com/v1"

# ?? Current Weather Tool
@mcp.tool()
def get_current_weather(location: str):
    if not API_KEY:
        return {"error": "WEATHER_API_KEY not set"}

    try:
        response = requests.get(
            f"{BASE_URL}/current.json",
            params={"key": API_KEY, "q": location},
            timeout=5
        ).json()

        return {
            "location": response["location"]["name"],
            "temp_c": response["current"]["temp_c"],
            "condition": response["current"]["condition"]["text"]
        }

    except Exception as e:
        return {"error": str(e)}


# ?? Forecast Tool (NEW)
@mcp.tool()
def get_weather_forecast(location: str, days: int = 3):
    """
    Get weather forecast for given number of days (1 to 10)
    """
    if not API_KEY:
        return {"error": "WEATHER_API_KEY not set"}

    # Limit days (WeatherAPI allows max 10)
    days = max(1, min(days, 10))

    try:
        response = requests.get(
            f"{BASE_URL}/forecast.json",
            params={"key": API_KEY, "q": location, "days": days},
            timeout=5
        ).json()

        forecast_days = response["forecast"]["forecastday"]

        result = []
        for day in forecast_days:
            result.append({
                "date": day["date"],
                "max_temp_c": day["day"]["maxtemp_c"],
                "min_temp_c": day["day"]["mintemp_c"],
                "condition": day["day"]["condition"]["text"]
            })

        return {
            "location": response["location"]["name"],
            "forecast": result
        }

    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    mcp.run()