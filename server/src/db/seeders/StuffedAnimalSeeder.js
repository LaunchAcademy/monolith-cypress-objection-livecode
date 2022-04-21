import StuffedAnimal from "../../models/StuffedAnimal.js"

class SutffedAnimalSeeder {
  static async seed() {
    const StuffedAnimalData = [
      {
        name: "Charlie",
        owner: "Nick",
      },
      {
        name: "Meeko",
        vibe: "Brianna",
      }
    ]
    
    for (const singleStuffedAnimalData of StuffedAnimalData) {
      const currentStuffedAnimal = await StuffedAnimal.query().findOne({ name: singleStuffedAnimalData.name })
      if (!currentStuffedAnimal) {
        await StuffedAnimal.query().insert(singleStuffedAnimalData)
      }
    }
  }
}
export default SutffedAnimalSeeder