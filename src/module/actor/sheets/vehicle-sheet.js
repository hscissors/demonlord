import DLBaseActorSheet from './base-actor-sheet'

export default class DLVehicleSheet extends DLBaseActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['vehicle', 'sheet', 'actor', 'dl-sheet'],
      template: 'systems/demonlord/templates/actor/vehicle-sheet.hbs',
      width: 900,
      height: 700,
      tabs: [
        {
          navSelector: '.sheet-navigation',
          contentSelector: '.sheet-body',
          initial: 'vehicle',
        },
      ],
      scrollY: ['.tab.active'],
    })
  }

  /* -------------------------------------------- */
  /*  Data preparation                            */

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    const data = await super.getData()
    data.dtypes = ['String', 'Number', 'Boolean']
    this.prepareItems(data)
    return data
  }

  prepareItems(sheetData) {
    super.prepareItems(sheetData)
    const m = sheetData._itemsByType
    const actorData = sheetData.actor
    actorData.specialactions = m.get('specialaction') || []
    actorData.endoftheround = m.get('endoftheround') || []
    actorData.magic = m.get('magic') || []
  }

  /* -------------------------------------------- */

  /** @override */
  async _onDropActor(event, actorData) { 
    const target = event.target.closest("[data-type]").dataset.type
    switch(target) {
      case "driver":
        await this.actor.addDriver(actorData)
        break
      case "crew":
        await this.actor.addCrew(actorData)
        break
      default:
        break
    }
    
    await super._onDropActor(event, actorData)
  }

  /** @override */
  async checkDroppedItem(itemData) {
    if (['armor', 'ammo', 'ancestry', 'path', 'profession', 'item', 'language', 'creaturerole', 'relic'].includes(itemData.type)) return false
    return true
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html)

    // Dynamically set the reference tab layout to two column if its height exceeds a certain threshold
    html.find('.sheet-navigation').click(_ => this._resizeAutoColumns(this.element))
    this._resizeAutoColumns(html)

    // Health bar clicks
    html.on('mousedown', '.addDamage', ev => {
      if (ev.button == 0) this.actor.increaseDamage(+1)
      // Increase damage
      else if (ev.button == 2) this.actor.increaseDamage(-1) // Decrease damage
    })

    // Speed bar clicks
    html.on('mousedown', '.addSpeed', ev => {
      if (ev.button == 0) this.actor.increaseSpeed(+1)
      // Increase speed
      else if (ev.button == 2) this.actor.increaseSpeed(-1) // Decrease damage
    })

    // Edit total health and maximum speed
    html.find('.bar-edit').click(async () => {
      const actor = this.actor
      const showEdit = actor.system.characteristics.editbar
      actor.system.characteristics.editbar = !showEdit

      await actor
        .update({
          'system.characteristics.editbar': actor.system.characteristics.editbar,
        })
        .then(_ => this.render())
    })

    html.find('.can-drag').on('dragenter', event => {
      this.actor.onDragEnter(event)
    })

    html.find('.can-drag').on('dragover', event => {
      this.actor.onDragEnter(event)
    })

    html.find('.can-drag').on('dragleave', event => {
      this.actor.onDragLeave(event)
    })

    html.find('.driver-delete').click(async ev => await this.actor.removeDriver())
    
    html.find('.crew-delete').click(async ev => await this.actor.removeCrew(ev))

    html.find('.drive-roll').click(async ev => await this.actor.rollDrive())

    html.find('.drive-toggle-control').click(async ev => await this.actor.toggleUncontrolled())

    html.find('.drive-action label').click(async ev => {
      const description = $(ev.currentTarget).closest('[data-item-id]').data('itemId')
      let result = description.replace(/1d6|2d6|3d6/gi, function (x) {
        return "[[/roll " + x + " ]]";
      });
      await this.actor.rollMessage(result)
    })

    // Health bar fill
    const healthbar = html.find('.healthbar-fill')
    if (healthbar.length > 0) {
      const health = this.actor.system.characteristics.health
      healthbar[0].style.width = Math.floor((+health.value / +health.max) * 100) + '%'
    }

    // Speed bar fill
    const speedbar = html.find('.speedbar-fill')
    if (speedbar.length > 0) {
      const speed = this.actor.system.characteristics.vehiclespeed
      speedbar[0].style.width = Math.floor((+speed.value / +speed.max) * 100) + '%'
    }
  }

  _resizeAutoColumns(element) {
    element.find('.dl-auto-column').each((_, ac) => {
      ac = $(ac)
      if (ac.height() > 700) ac.css({'columns': '2'})
    })
  }

}
