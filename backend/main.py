from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from datetime import datetime

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change this to your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MERAKI_API_KEY = ""
HEADERS = {"X-Cisco-Meraki-API-Key": MERAKI_API_KEY, "Content-Type": "application/json"}

class Network(BaseModel):
    id: str
    name: str

class Organization(BaseModel):
    id: str
    name: str

class SSID(BaseModel):
    name: str
    usage_2_4: int
    connectedDevices_2_4: int
    usage_5: int
    connectedDevices_5: int
    usage_6: int
    connectedDevices_6: int

class DateTimeRequest(BaseModel):
    startDateTime: datetime
    endDateTime: datetime

@app.get("/organizations", response_model=List[Organization])
def get_organizations():
    url = "https://api.meraki.com/api/v1/organizations"
    response = requests.get(url, headers=HEADERS)
    if response.status_code != 200:
        print(f"Error fetching organizations: {response.status_code} {response.text}")
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

@app.get("/organizations/{org_id}/networks", response_model=List[Network])
def get_networks(org_id: str):
    url = f"https://api.meraki.com/api/v1/organizations/{org_id}/networks"
    response = requests.get(url, headers=HEADERS)
    if response.status_code != 200:
        print(f"Error fetching networks: {response.status_code} {response.text}")
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

@app.get("/organizations/{org_id}/summary/top/ssids/byUsage", response_model=List[SSID])
def get_top_ssids_by_usage(org_id: str):
    url = f"https://api.meraki.com/api/v1/organizations/{org_id}/summary/top/ssids/byUsage"
    response = requests.get(url, headers=HEADERS)
    if response.status_code != 200:
        print(f"Error fetching top SSIDs by usage: {response.status_code} {response.text}")
        raise HTTPException(status_code=response.status_code, detail=response.text)
    
    ssids = response.json()
    
    ssid_info = []
    for ssid in ssids:
        usage_2_4 = int(ssid.get("usage", {}).get("band", {}).get("2.4GHz", {}).get("total", 0))
        connected_devices_2_4 = ssid.get("clients", {}).get("band", {}).get("2.4GHz", {}).get("counts", {}).get("total", 0)
        usage_5 = int(ssid.get("usage", {}).get("band", {}).get("5GHz", {}).get("total", 0))
        connected_devices_5 = ssid.get("clients", {}).get("band", {}).get("5GHz", {}).get("counts", {}).get("total", 0)
        usage_6 = int(ssid.get("usage", {}).get("band", {}).get("6GHz", {}).get("total", 0))
        connected_devices_6 = ssid.get("clients", {}).get("band", {}).get("6GHz", {}).get("counts", {}).get("total", 0)

        ssid_info.append({
            "name": ssid.get("name"),
            "usage_2_4": usage_2_4,
            "connectedDevices_2_4": connected_devices_2_4,
            "usage_5": usage_5,
            "connectedDevices_5": connected_devices_5,
            "usage_6": usage_6,
            "connectedDevices_6": connected_devices_6,
        })
    
    print(f"SSID Info: {ssid_info}")
    return ssid_info

@app.post("/getDateTime")
def get_date_time(date_time_request: DateTimeRequest):
    start_date_time = date_time_request.startDateTime
    end_date_time = date_time_request.endDateTime
    print(f"Start Date and Time: {start_date_time}")
    print(f"End Date and Time: {end_date_time}")
    return {
        "startDateTime": start_date_time,
        "endDateTime": end_date_time
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)