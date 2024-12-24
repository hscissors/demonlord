import { action, activatedEffect } from '../common.js'
import { makeBoolField, makeHtmlField, makeIntField, makeStringField } from '../helpers.js'

export default class WeaponDataModel extends foundry.abstract.DataModel {
  static defineSchema() {
    return {
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