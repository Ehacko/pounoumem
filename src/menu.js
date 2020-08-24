const {shell, Menu} = require('electron')

  let menu = [
    {
      label: 'Editer',
      submenu: [
        {
          label: 'Annuler',
          role: 'undo'
        },
        {
          label: 'Refaire',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: 'Couper',
          role: 'cut'
        },
        {
          label: 'Copier',
          role: 'copy'
        },
        {
          label: 'Coller',
          role: 'paste'
        }
      ]
    },
    
    {
      label: 'Affichage',
      submenu: [
        {
          label: 'Recharger',
          role: 'reload'
        },
        {
          label: 'Inspecteur',
          role: 'toggledevtools'
        },
        {
          type: 'separator'
        },
        {
          label: 'Reinitialiser le zoom',
          role: 'resetzoom'
        },
        {
          label: 'Zoomer',
          role: 'zoomin'
        },
        {
          label: 'Dezoomer',
          role: 'zoomout'
        },
        {
            type: 'separator'
        },
        {
          label: 'Plein écran',
          role: 'togglefullscreen'
        }
      ]
    },
    
    {
      label: 'Fenêtre',
      role: 'window',
      submenu: [
        {
          label: 'Minimiser',
          role: 'minimize'
        },
        {
          label: 'Fermer',
          role: 'close'
        }
      ]
    },
    
    {
      label: 'Aide',
      role: 'help',
      submenu: [
        {
          label:'Apprendre plus', 
          click() { 
            shell.openExternal('http://www.pounoumenm.fr')
          } 
        },
        {
          label:'Documentation', 
          click() { 
            shell.openExternal('http://www.pounoumenm.fr/documentation')
          } 
        },
        {
          label:'Communauté', 
          click() {
            shell.openExternal('http://www.pounoumenm.fr/forum')
          }
        }
      ]
    }
  ]
  menu = Menu.buildFromTemplate(menu)
module.exports = menu;