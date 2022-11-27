export function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setDate(date.getDate() + 30);
    expires = date;
  }
  let cookie = name + "=" + (value || "") + ",Expires=" + (expires || "");
  document.cookie = cookie
}

export function getCookie(name) {
  let nameEQ = name + "=";
  let cookie = document.cookie.split(',');
  if(cookie.length !== 1){
    let expirationDate = new Date(cookie[1].split('=')[1]) || ""
    let currentDate = new Date()
    if (currentDate.getTime() <= expirationDate.getTime()) {
      for (let i = 0; i < cookie.length; i++) {
        let c = cookie[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
      }
    }else{
      eraseCookie(name)
      return null;
    }
  }
  return null;
}

export function eraseCookie(name) {
  document.cookie = name + '=,Expires=';
}
