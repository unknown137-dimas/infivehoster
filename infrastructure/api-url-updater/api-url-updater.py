import requests
import re

ngrok_url = 'http://localhost:4040/api/tunnels'
res = requests.get(ngrok_url)
api_public_url = res.json()['tunnels'][0]['public_url']
print(api_public_url)

with open('register.js', 'r') as api_file:
    lines = api_file.readlines()
    for line in lines:
        if 'https://' in line:
            new = re.sub('https://[a-z0-9]{4}-[a-z0-9]{3}-[a-z0-9]{2}-[a-z0-9]{2}-[a-z0-9]{2}\.[a-z0-9]{2}\.ngrok\.io', api_public_url, line)
            lines[lines.index(line)] = new
    with open('register.js', 'w') as output_api_file:
        output_api_file.writelines(lines)