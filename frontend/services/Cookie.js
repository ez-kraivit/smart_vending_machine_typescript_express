
const setCookie = (cname, cvalue, ctime = 1, timeSelect = 1 || 2 || 3 || 4) => {
  const now = new Date();
  let expires = "expires=" + now.toUTCString();
  switch (timeSelect) {
    case 1: now.setTime(now.getTime() + (ctime * 1000*60)); break;
    case 2: now.setTime(now.getTime() + (ctime * 1000*60*1000*60)); break;
    case 3: now.setTime(now.getTime() + (ctime * 1000*60*60*24)); break;
    case 4: now.setTime(now.getTime() + (ctime * 1000*60*60*24*7)); break;
    default: now.setTime(now.getTime() + (ctime * 1000*60)); break;
  }
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

export { setCookie, getCookie }
