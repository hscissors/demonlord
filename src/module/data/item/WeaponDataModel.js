import { action, activatedEffect } from '../common.js'
import { makeBoolField, makeHtmlField, makeIntField, makeStringField } from '../helpers.js'

export default class WeaponDataModel extends foundry.abstract.DataModel {
  static defineSchema() {
    return {
      description: makeHtmlField(),
      action: new foundry.data.fields.SchemaField({
        active: makeBoolField(true),
        attack: makeStringField(),
        against: makeStringField(),
        damageactive: makeBoolField(true),
        damage: makeStringField(),
        damagetype: makeStringField(),
        boonsbanesactive: makeBoolField(true),
        boonsbanes: makeStringField(),
        plus20active: makeBoolField(true),
        plus20: makeStringField(),
        plus20damage: makeStringField(),
        defense: makeStringField(),
        defenseboonsbanes: makeStringField(),
        damagetypes: new foundry.data.fields.ArrayField(new foundry.data.fields.SchemaField({
          damage: makeStringField(),
          damagetype: makeStringField()
        })),
        strengthboonsbanesselect: makeBoolField(),
        agilityboonsbanesselect: makeBoolField(),
        intellectboonsbanesselect: makeBoolField(),
        willboonsbanesselect: makeBoolField(),
        perceptionboonsbanesselect: makeBoolField(),
        extraboonsbanes: makeStringField(),
        extradamage: makeStringField(),
        extraplus20damage: makeStringField(),
        extraEffect: makeStringField(),
        extraEffect20: makeStringField()
      }),
      activatedEffect: activatedEffect(),
      enrichedDescription: makeHtmlField(),
      hands: makeStringField(),
      properties: makeStringField(),
      requirement: new foundry.data.fields.SchemaField({
        attribute: makeStringField(),
        minvalue: makeIntField()
      }),
      wear: makeBoolField(true),
      quantity: makeIntField(1),
      availability: makeStringField(),
      value: makeStringField(),
      consume: new foundry.data.fields.SchemaField({
        reloadRequired: makeBoolField(false),
        ammorequired: makeBoolField(false),
        amount: makeIntField(1),
        ammoitemid: makeStringField()
      }),      
    }
  }
}

export function makeWeaponSchema() {
  return new foundry.data.fields.SchemaField({
    description: makeHtmlField(),
    action: action(),
    activatedEffect: activatedEffect(),
    enrichedDescription: makeHtmlField(),
    hands: makeStringField(),
    properties: makeStringField(),
    requirement: new foundry.data.fields.SchemaField({
      attribute: makeStringField(),
      minvalue: makeIntField()
    }),
    wear: makeBoolField(true),
    quantity: makeIntField(1),
    availability: makeStringField(),
    value: makeStringField(),
    consume: new foundry.data.fields.SchemaField({
      reloadRequired: makeBoolField(false),
      ammorequired: makeBoolField(false),
      amount: makeIntField(1),
      ammoitemid: makeStringField()
    }),    
  })
}