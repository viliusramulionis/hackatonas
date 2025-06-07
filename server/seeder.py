from models.budy import Budy
import requests 
import random

for x in range(10) :
    res = requests.get("https://randomuser.me/api/")
    name = res.json()["results"][0]["name"]["first"] + " " + res.json()["results"][0]["name"]["last"]
    location = res.json()["results"][0]["location"]["city"] + " " +  res.json()["results"][0]["location"]["country"]
    git_url = "https://github.com"
    linkedin_url = "https://linkedin.com"
    format_type = random.randint(0,1)
    photo = res.json()["results"][0]["picture"]["large"]
    user_id = 1
    slack_userid = "randombicas"
    
    budy = Budy()
    budy.insert_row({ "name" : name, 
                        "location" : location, 
                        "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        "github_url" : git_url, 
                        "linkedin_url" : linkedin_url, 
                        "format" : format_type, 
                        "photo" : photo, 
                        "user_id" : user_id, 
                        "slack_userid" : slack_userid
                    })
    # print(res.json()["results"]["name"]["first"] + res.json()["results"]["name"]["last"])
    