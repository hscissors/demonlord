const { DialogV2 } = foundry.applications.api

export default function launchInsanityDialog(dialogTitle, callback) {
    const d = new DialogV2({
      window: { title: dialogTitle },
      content: `<div class="insanitydialog"></div>`,
      buttons: [
        {
          action: 'minor',
          label: "Minor",
          callback: html => callback(html, 'minor'),
        },
        {
          action: 'moderate',
          label: "Moderate",
          callback: html => callback(html, 'moderate'),
        },
        {
          action: 'major',
          label: "Major",
          callback: html => callback(html, 'major'),
        },
        {
          action: 'severe',
          label: "Severe",
          callback: html => callback(html, 'severe'),
        },
        {
          action: 'extreme',
          label: "Extreme",
          callback: html => callback(html, 'extreme'),
        },
      ],
      close: () => {},
    })
    d.render(true)
  }