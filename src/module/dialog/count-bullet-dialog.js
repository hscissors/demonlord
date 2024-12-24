const { DialogV2 } = foundry.applications.api

export default function launchCountBulletsDialog(dialogTitle, callback) {
    const d = new DialogV2({
      window: { title: dialogTitle },
      content: `<div class="countbulletsdialog"></div>`,
      buttons: [
        {
          action: 'single',
          label: "Single Shots",
          callback: html => callback(html, 'single'),
        },
        {
          action: 'full',
          label: "Fully Automatic",
          callback: html => callback(html, 'full'),
        },
        {
          action: 'cancel',
          icon: 'fas fa-times',
          label: game.i18n.localize('DL.DialogCancel'),
          callback: () => {},
        },
      ],
      close: () => {},
    })
    d.render(true)
  }