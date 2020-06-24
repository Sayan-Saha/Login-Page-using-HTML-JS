var uFlag = false;
var pFlag = false;

$(document).ready(function () {
  $('[id="admin"]').tooltip();
});

function login() {
  localStorage.setItem("userName", document.getElementById("userName").value);
}

function validate(e) {
  let id = e.attributes["id"].nodeValue;

  const userNameError = document.getElementById("userNameError");
  const passwordError = document.getElementById("passwordError");
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

function isValid(str, type) {
  let msg;
  switch (type) {
    case 0:
      if (str.match(/^[a-zA-Z0-9]{4,10}$/)) {
        msg = "";
        uFlag = true;
      } else if (str.length <= 3) {
        msg = "Please Enter at least four charecter!";
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
