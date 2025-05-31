const { DialogV2 } = foundry.applications.api

export default function launchRollDialog(dialogTitle, callback) {
  const d = new DialogV2({
    window: { title: dialogTitle },
    content: `
      <div class="challengedialog">
      <input id='boonsbanes' style='width: 50px;margin: 5px;text-align: center' type='number' value=0 data-dtype='Number'/>
      <b>${game.i18n.localize('DL.DialogAddBonesAndBanes')}</b>
      </div>
      <div class="challengedialog">
      <input id='modifier' style='width: 50px;margin: 5px;text-align: center' type='number' value=0 data-dtype='Number'/>
      <b>${game.i18n.localize('DL.ModsAdd')}</b>
      </div>
      `,
    buttons: [
      {
        action: "roll",
        label: game.i18n.localize('DL.DialogRoll'),
        callback: html => callback(html),
      },
      {
        action: 'cancel',
        label: game.i18n.localize('DL.DialogCancel'),
        callback: () => { },
      },
    ],
    default: 'roll',
    close: () => { },
  })
  d.render(true)
}
