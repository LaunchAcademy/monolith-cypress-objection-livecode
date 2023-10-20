import React, { useEffect, useState } from "react"

import { Link } from "react-router-dom"

const StuffedAnimalDetailsPage = (props) => {

  const [stuffedAnimal, setStuffedAnimal] = useState({})
  const id = props.match.params.id

  const getSpecificStuffedAnimal = async () => {
    const response = await fetch(`/api/v1/stuffed-animals/${id}`)
    const animalData = await response.json()
    setStuffedAnimal(animalData.stuffedAnimal)
  }

  useEffect(() => {
    getSpecificStuffedAnimal()
  }, [])


  return (
    <>
      <h2>{stuffedAnimal.name}</h2>
      <p id="owner">
        {stuffedAnimal.owner}
      </p>
      <Link to="/stuffed-animals">
        Back to All Stuffed Animals
      </Link>
    </>
  )
}

export default StuffedAnimalDetailsPage