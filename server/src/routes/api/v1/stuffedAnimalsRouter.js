import express from "express"

import { ValidationError } from "objection"

import cleanUserInput from "../../../services/cleanUserInput.js"

import { StuffedAnimal } from "./../../../models/index.js"

const stuffedAnimalsRouter = new express.Router()

stuffedAnimalsRouter.get("/", async (req, res) => {
  try {
    const stuffedAnimals = await StuffedAnimal.query()
    console.log(stuffedAnimals)
    return res.status(200).json({ stuffedAnimals })
  }
  catch (err) {
    return res.status(500).json({ errors: err })
  }
})

stuffedAnimalsRouter.post("/", async (req, res) => {
  const stuffedAnimalData = cleanUserInput(req.body)

  try {
    const newStuffedAnimal = await StuffedAnimal.query().insertAndFetch(stuffedAnimalData)
    return res.status(201).json({ stuffedAnimal: newStuffedAnimal })
  } catch (error) {
    if (error instanceof ValidationError) {

      return res.status(422).json({ errors: error.data })
    }
  return res.status(500).json({ errors: error })
}
})

stuffedAnimalsRouter.get("/:id", async (req, res) => {

  const stuffedAnimal = await StuffedAnimal.query().findById(req.params.id)

  return res.json({ stuffedAnimal: stuffedAnimal })
})


export default stuffedAnimalsRouter