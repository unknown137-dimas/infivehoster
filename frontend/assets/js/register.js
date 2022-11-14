async function UserAction(){
  var ItemJSON = {"email":document.getElementById('email').value,"firstName":document.getElementById('firstname').value,"lastName":document.getElementById('lastname').value,"password":document.getElementById('password').value,"username":document.getElementById('username').value};
  // console.log(ItemJSON);
  
  const response = await fetch('https://api-ifiver.loca.lt/register', {
    method: 'POST',
    body: JSON.stringify(ItemJSON), // string or object
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const myJson = await response.json(); //extract JSON from the http response
  // alert(myJson["message"])
  // console.log(myJson['message'])
  return myJson['message'];
}

async function CreateVM(){
  var ItemJSON1 = {"password":document.getElementById('password').value,"username":document.getElementById('username').value,"template_id":parseInt(sessionStorage.getItem('template_id')),"vm_name":(sessionStorage.getItem('vm_name')+"_"+document.getElementById('username').value)};
  // sessionStorage.removeItem('template_id');
  // console.log(ItemJSON1);
  
  const response1 = await fetch('https://api-ifiver.loca.lt/createvm', {
    method: 'POST',
    body: JSON.stringify(ItemJSON1), // string or object
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const myJson1 = await response1.json(); //extract JSON from the http response
  // alert(myJson["message"])
  // console.log(myJson1['message'])
  return myJson1['message'];
}

async function CheckVariable(){
  email = document.getElementById('email').value;
  firstname = document.getElementById('firstname').value;
  lastname = document.getElementById('lastname').value;
  password = document.getElementById('password').value;
  username = document.getElementById('username').value;
  vm_package = sessionStorage.getItem('template_id');
  if (email == null || email == ""){
    return "E-mail cannot be empty."
  } else if (firstname == null || firstname == ""){
    return "Firstname cannot be empty."
  } else if (lastname == null || lastname == ""){
    return "Lastname cannot be empty."
  } else if (password == null || password == ""){
    return "Password cannot be empty."
  } else if (username == null || username == ""){
    return "Username cannot be empty."
  } else if (vm_package == null || vm_package == ""){
    return "You have not selected a package type. Please return to the home page."
  } else {
    return "Filled"
  }
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("submitBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = async function() {
  check = await CheckVariable()
  if (await check == "Filled") {
    result = UserAction().then((res) => {
      document.getElementById('result').innerHTML = res;
    });
    CreateVM();
    modal.style.display = "block";
  } else {
    document.getElementById('result').innerHTML = check;
    modal.style.display = "block";
  }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
