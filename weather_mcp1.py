from mcp.server.fastmcp import FastMCP
import requests
import os

mcp = FastMCP("weather")

API_KEY = os.getenv("WEATHERAPI_KEY")

@mcp.tool()
def get_current_weather(location: str):
    url = f"http://api.weatherapi.com/v1/current.json?key=bede3b3cd1be483eb17120616262303&q={location}"
    response = requests.get(url).json()

    return {
        "location": response["location"]["name"],
        "temp_c": response["current"]["temp_c"],
        "condition": response["current"]["condition"]["text"]
    }

if __name__ == "__main__":
    mcp.run()