import {
  attributes,
  characteristics,
} from '../common.js'

import {
  makeBoolField,
  makeIntField,
  makeStringField,
  makeHtmlField
} from '../helpers.js'

export default class VehicleDataModel extends foundry.abstract.DataModel {
  static defineSchema() {
    const type = 'vehicle'

    return {
      description: makeHtmlField(),
      enrichedDescription: makeHtmlField(),
      attributes: attributes(),
      characteristics: characteristics(type),
      fastturn: makeBoolField(),
      descriptor: makeStringField(),
      speedtraits: makeStringField(),
      price: makeStringField(),
      cargo: makeIntField(0),
      crew: makeStringField(),
      driver: makeStringField(),
      uncontrolled: makeBoolField(true)
    }
  }

  get type() {
    return 'vehicle'
  }
}