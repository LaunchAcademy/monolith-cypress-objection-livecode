	/* eslint-disable no-console */
  import { connection } from "../boot.js"

  import StuffedAnimalSeeder from "./seeders/StuffedAnimalSeeder.js"
  
  class Seeder {
    static async seed() {
      console.log("seeding stuffed animals")
      await StuffedAnimalSeeder.seed()

      console.log("Done!")
      await connection.destroy()
    }
  }
  export default Seeder