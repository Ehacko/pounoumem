// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
  let appinfo = require('../package.json')
  replaceText(`app-name`, appinfo.name)
  replaceText(`appTitle`, appinfo.name)
  replaceText(`app-version`, appinfo.version)
  let frame = document.getElementById("ThisIsSparta");
  frame.removeAttribute("id");
  frame.onload = () => {
    document.body.removeChild(document.body.children[0]);
  }

})
