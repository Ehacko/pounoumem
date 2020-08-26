// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const
{Titlebar, Color} = require('custom-electron-titlebar'),
appinfo = require('../package.json'),
data = require('./test.json'),
replaceText = (selector, text) => {
  let element = document.getElementById(selector)
    if (element) element.innerText = text
  };

let xhr = new XMLHttpRequest();
xhr.open('POST', "https://mondesperdus.com/Api/Bookmark/writeden", true);
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
// xhr.onreadystatechange =()=> { if(xhr.readyState == 4 && xhr.status == 200) { alert(xhr.responseText); } }
xhr.send(JSON.stringify(data));
console.log(JSON.stringify(data));
window.addEventListener('DOMContentLoaded', () => {
  new Titlebar({
    backgroundColor: Color.fromHex('#444')
  });

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
  replaceText(`app-name`, appinfo.name)
  replaceText(`appTitle`, appinfo.name)
  replaceText(`app-version`, appinfo.version)
  let frame = document.getElementById("ThisIsSparta");
  frame.removeAttribute("id");
  frame.onload = () => {
    document.body.children[1].removeChild(document.body.children[1].children[0]);
  }
  console.log(appinfo.version);
})
