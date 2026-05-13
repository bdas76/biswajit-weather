from mcp.server.fastmcp import FastMCP
import requests
import os

mcp = FastMCP("weather")

BASE_URL = "http://api.weatherapi.com/v1"
API_KEY = "bede3b3cd1be483eb17120616262303&q"


def call_weather_api(endpoint: str, params: dict):
    """Reusable API caller with error handling"""
    try:
        params["key"] = API_KEY
        url = f"{BASE_URL}/{endpoint}"

        response = requests.get(url, params=params, timeout=10)

        if response.status_code != 200:
            return {
                "status": "error",
                "code": response.status_code,
                "message": response.text
            }

        return response.json()

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }


# ??? Current Weather Tool
@mcp.tool()
def get_current_weather(location: str):
    """
    Get real-time weather for a location
    Example: London, 10001, 48.85,2.35
    """
    data = call_weather_api("current.json", {"q": location})

    if "error" in data:
        return data

    return {
        "location": data["location"]["name"],
        "region": data["location"]["region"],
        "country": data["location"]["country"],
        "temperature_c": data["current"]["temp_c"],
        "feels_like_c": data["current"]["feelslike_c"],
        "condition": data["current"]["condition"]["text"],
        "wind_kph": data["current"]["wind_kph"],
        "humidity": data["current"]["humidity"],
        "last_updated": data["current"]["last_updated"]
    }


# ?? Forecast Tool
@mcp.tool()
def get_weather_forecast(location: str, days: int = 3):
    """
    Get weather forecast (1–14 days)
    """
    data = call_weather_api("forecast.json", {
        "q": location,
        "days": days
    })

    if "error" in data:
        return data

    forecast_days = []

    for day in data["forecast"]["forecastday"]:
        forecast_days.append({
            "date": day["date"],
            "max_temp_c": day["day"]["maxtemp_c"],
            "min_temp_c": day["day"]["mintemp_c"],
            "avg_temp_c": day["day"]["avgtemp_c"],
            "condition": day["day"]["condition"]["text"]
        })

    return {
        "location": data["location"]["name"],
        "forecast": forecast_days
    }


# ?? Location Search Tool (from docs)
@mcp.tool()
def search_location(query: str):
    """
    Search for matching locations
    """
    data = call_weather_api("search.json", {"q": query})

    if "error" in data:
        return data

    return [
        {
            "name": loc["name"],
            "region": loc["region"],
            "country": loc["country"],
            "lat": loc["lat"],
            "lon": loc["lon"]
        }
        for loc in data
    ]


if __name__ == "__main__":
    if not API_KEY:
        raise ValueError("WEATHER_API_KEY environment variable not set")

    mcp.run()