import requests
import re
import time

file = 'frontend/assets/js/register.js'

while True:
    ngrok_url = 'http://localhost:4040/api/tunnels'
    res = requests.get(ngrok_url)
    api_public_url = res.json()['tunnels'][0]['public_url']
    print('Watching API URL for changes...')
    with open(file, 'r') as api_file:
        print('Reading register.js file...')
        lines = api_file.readlines()
    for line in lines:
        api_url = re.findall('https://[a-z0-9]{4}-[a-z0-9]{3}-[a-z0-9]{2}-[a-z0-9]{2}-[a-z0-9]{2}[.][a-z0-9]{2}[.]ngrok[.]io', line)
        if api_url:
            if api_url[0] != api_public_url:
                new = re.sub('https://[a-z0-9]{4}-[a-z0-9]{3}-[a-z0-9]{2}-[a-z0-9]{2}-[a-z0-9]{2}[.][a-z0-9]{2}[.]ngrok[.]io', api_public_url, line)
                lines[lines.index(line)] = new
                print('Updating API URL...')
                with open(file, 'w') as output_api_file:
                    output_api_file.writelines(lines)
                    print('API URL updated successfully. :)')
            else:
                print('No changes detected...')
                break
    time.sleep(5)