from flask import Flask, request, make_response
from flask_cors import CORS
import pyone
import re

def createUser(username,password):
    one = pyone.OneServer("http://10.33.102.247:2633/RPC2", session="oneadmin:ACC313137")
    login = one.user.allocate(username,password,'core')
    # print(login)
    data = {
        "user_id":login,
        "username":username
    }
    return data

def createVM(username,password,template_id,vm_name):
    one = pyone.OneServer("http://10.33.102.247:2633/RPC2", session="{}:{}".format(username,password))
    add_vm = one.template.instantiate(template_id,vm_name,False,"",False)
    data = {
        "vm_id":add_vm,
        "vm_name":vm_name
    }
    return data

app = Flask(__name__)
cors = CORS(app)

@app.route('/')
def landing():
    return ('<h1>InFiveHosting API</h1>')

@app.route('/register', methods=['POST'])
def create_user():
    data = request.get_json()
    try:
        new_user = createUser(username=data.get('username'), password=data.get('password'))

        response = make_response({"status": "success", "message": "New user created", "data": new_user})
        response.headers['Content-Type'] = 'application/json'
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Bypass-Tunnel-Reminder','')
        response.status_code = 201
        return response
    except pyone.OneInternalException as e:
        message = str(e).replace(' by USER ','').replace('[one.user.allocate] ','').replace('NAME','Username')
        response = make_response({"status": "error", "message": re.sub('\d','',message)})
        response.status_code = 400
        response.headers['Content-Type'] = 'application/json'
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Bypass-Tunnel-Reminder','')
        return response
    except:
        response = make_response({"status": "error", "message": "Server fail"})
        response.status_code = 500
        response.headers['Content-Type'] = 'application/json'
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Bypass-Tunnel-Reminder','')
        return response

@app.route('/createvm', methods=['POST'])
def create_vm():
    data = request.get_json()
    try:
        new_vm = createVM(username=data.get('username'), password=data.get('password'),template_id=data.get('template_id'),vm_name=data.get('vm_name'))
        response = make_response({"status": "success", "message": "New vm created", "data": new_vm})
        response.headers['Content-Type'] = 'application/json'
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Bypass-Tunnel-Reminder','')
        response.status_code = 201
        return response
    except:
        response = make_response({"status": "error", "message": "Server fail"})
        response.status_code = 500
        response.headers['Content-Type'] = 'application/json'
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Bypass-Tunnel-Reminder','')
        return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
