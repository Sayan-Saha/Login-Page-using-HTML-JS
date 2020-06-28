var uFlag = false;
var pFlag = false;
const myForm = document.getElementById("form");

const userNameError = document.getElementById("userNameError");
const passwordError = document.getElementById("passwordError");
const user = document.getElementById("userName");

myForm.onsubmit = function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  //Submiting the form data
  fetch("http://localhost:3000/user/", {
    method: "post",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.message);
    })
    .catch(function (error) {
      console.log(error.message);
    });

  //checking the credentials
  fetch("http://localhost:3000/user/", {
    method: "get",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.registered) {
        if (data.authenticated) {
          localStorage.setItem("name", user.value);
          setCookie("username", user.value, 1);
          window.location = "./home.html";
        } else {
          passwordError.innerText = "You entered Wrong password!";
        }
      } else {
        userNameError.innerText = "Sorry! User not registered!";
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

//Form Reset
myForm.onreset = function () {
  userNameError.innerText = "";
  passwordError.innerText = "";
  this.reset();
};

//Setting Cookies
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//Validation of each field and setting error message
function validate(e) {
  let id = e.attributes["id"].nodeValue;
  let sb = document.getElementById("submitButton");

  if (id == "userName") {
    userNameError.innerText = isValid(e.value, 0);
    //console.log(e.value);
  }
  if (id == "password") {
    passwordError.innerText = isValid(e.value, 1);
    //console.log(e.value);
  }
  if (uFlag && pFlag) {
    sb.disabled = false;
  } else {
    sb.disabled = true;
  }
}

//Validation of any input field
function isValid(str, type) {
  let msg;

  switch (type) {
    case 0:
      if (str.match(/^[a-zA-Z0-9]{4,10}$/)) {
        msg = "";
        uFlag = true;
      } else if (str.length <= 3) {
        msg = "Please Enter at least four character!";
        uFlag = false;
      } else if (str.length <= 0) {
        msg = "Please Enter User Name!";
        uFlag = false;
      } else {
        msg = "Please Enter User Name in correct format!(No special Character)";
        uFlag = false;
      }
      break;

    case 1:
      if (str.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
        msg = "";
        pFlag = true;
      } else if (str.length <= 5) {
        msg = "Password length must be greater than five!";
        pFlag = false;
      } else if (str.length <= 0) {
        msg = "Please Enter Password!";
        uFlag = false;
      } else {
        msg =
          "Please Enter Password in correct format!(Must include small and caps letter, number and special character)";
        pFlag = false;
      }
  }
  return msg;
}

//Password toggle
function togglePassword() {
  var pwdType = document.getElementById("password").type;
  var eyeClass = document.getElementById("eye").className;

  if (pwdType == "password") {
    document.getElementById("password").type = "text";
    document.getElementById("eye").className = "fa fa fa-eye";
  } else {
    document.getElementById("password").type = "password";
    document.getElementById("eye").className = "fa fa-eye-slash";
  }
}
