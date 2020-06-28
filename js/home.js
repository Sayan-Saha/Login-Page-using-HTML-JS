//Checking cookies before loading the page
checkCookie();

//rendering the current user name
document.getElementById("loggedUser1").innerHTML =
  "Hi " + localStorage.getItem("name");
document.getElementById("loggedUser2").innerHTML =
  "Welcome " + localStorage.getItem("name");

//LOGOUT function
function logout() {
  localStorage.clear();
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location = "./login.html";
}

//Check Cookies function
function checkCookie() {
  var username = getCookie("username");
  if (username == "") {
    window.location = "./login.html";
  }
}

//Get Cookies function
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
