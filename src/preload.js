// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const
{Titlebar, Color} = require('custom-electron-titlebar'),
appinfo = require('../package.json'),
replaceText = (selector, text) => {
  const element = document.getElementById(selector)
  if (element) element.innerText = text
}

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
