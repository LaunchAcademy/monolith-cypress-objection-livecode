const Model = require("./Model")

const uniqueFactory = require("objection-unique")

const unique = uniqueFactory({
  fields: ["name"],
  identifiers: ["id"]
})

class StuffedAnimal extends unique(Model) {
  static get tableName() {
    return "stuffedAnimals"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string", minLength: 2, maxLength: 15 },
        owner: { type: "string" },
      }
    }
  }
}

module.exports = StuffedAnimal