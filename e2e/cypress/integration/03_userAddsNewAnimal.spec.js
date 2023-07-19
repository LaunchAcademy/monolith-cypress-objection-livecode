/// <reference types="cypress" />

context("Stuffed Animal Details Page", () => {
    beforeEach(() => {
        let stuffedAnimalId
        cy.task("db:truncate", "StuffedAnimal")
        // create the animal
        cy.task("db:insert", { modelName: "StuffedAnimal", json: { name: "Fang", owner: "Nick/Serena" } })

        // find the animal in the database. Because we have to use JS in Cypress, we need to be in a then block in order to properly get the id and visit the URL
        cy.task("db:find", { modelName: "StuffedAnimal", conditions: { name: "Fang", owner: "Nick/Serena" } }).then((stuffedAnimalData) => {
            stuffedAnimalId = stuffedAnimalData[0].id
            cy.visit(`/stuffed-animals/${stuffedAnimalId}`)
        })
    })

    context("when viewing the stuffed-animal details page", () => {
        it("the user can see each of the details regarding that stuffed animal", () => {
            cy.get("h2").should("include.text", "Fang")

            cy.get("#name")
                .should("have.text", "Fang");

            cy.get("#owner")
                .should("have.text", "Nick/Serena");
        })

        it("the page has a link to the stuffed-animals index page", () => {
            cy.contains("Back to All Stuffed Animals").click()
            cy.location("pathname").should("eq", "/stuffed-animals")
        })
    })
})
