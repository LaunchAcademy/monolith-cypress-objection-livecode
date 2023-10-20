/// <reference types="cypress" />
// model name:string json: array/object with data

context("Stuffed Animal Index Page", () => {
  beforeEach(() => {
    // clear the database so that tests are deterministic
    cy.task("db:truncate", "StuffedAnimal")

    // add the record, designating model name then data
    // adding an array of object will add multiple
    // visit page
    cy.task("db:insert", { modelName: "StuffedAnimal", json: [
      { name: "Todd", owner: "Nick" },
      { name: "Fang", owner: "Nick/Serena" }
    ]})

    cy.visit(`/stuffed-animals`)
  })
 
  context("when a user visits the stuffed animals index page", () => {
    // target the first and last animal, and ensure their text is included on the page
    it("they see a list of all the animals", () => {
      cy.get(".stuffed-animals")
        .get("li")
        .first()
        .should("include.text", "Todd")

      cy.get(".stuffed-animals")
        .get("li")
        .last()
        .should("include.text", "Fang")
    })
  })
  
  // clicking on the link should bring us to the new animal form 
  it("has a link to the new animal form page", () => {
    cy.contains('Add More to the Collection!').click()
    cy.location('pathname').should('eq', '/stuffed-animals/new')
  })
})































// /// <reference types="cypress" />

// context("Stuffed Animal Index Page", () => {
//   beforeEach(() => {
//     // clear the database so that tests are deterministic
//     cy.task("db:truncate", "StuffedAnimal")
//     // add the record, designating model name then data
//     // adding an array of object will add multiple
//     cy.task("db:insert", {
//       modelName: "StuffedAnimal",
//       json: [
//         { name: "Charlie", owner: "Nick" },
//         { name: "Meeko", owner: "Brianna" }
//       ]
//     })

//     cy.visit(`/stuffed-animals`)
//   })

//   it("lists all stuffed animals", () => {
//     cy.get(".stuffed-animals")
//       .find("li")
//       .first()
//       .should("have.text", "Charlie owned by Nick")

//     cy.get(".stuffed-animals")
//       .find("li")
//       .eq(1)
//       .should("have.text", "Meeko owned by Brianna")
//   })

//   it("has a link to the new animal form page", () => {
//     cy.contains('Add More to the Collection!').click()
//     cy.location('pathname').should('eq', '/stuffed-animals/new')
//   })
// })
