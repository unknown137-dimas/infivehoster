async function UserAction(){
  var ItemJSON = {"email":document.getElementById('email').value,"firstName":document.getElementById('firstname').value,"lastName":document.getElementById('lastname').value,"password":document.getElementById('password').value,"username":document.getElementById('username').value};
    console.log(ItemJSON);
    
    const response = await fetch('http://localhost:8080/register', {
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

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("submitBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = async function() {
  UserAction().then((res) => {
    document.getElementById('result').innerHTML = res;
  })
  modal.style.display = "block";
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
