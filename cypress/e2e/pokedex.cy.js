/// <reference types="Cypress" />

const URL = '127.0.0.1:8080/pokedex/index.html';

context('Pokedex',{ testIsolation: false }, () => {
  before(() =>{
    cy.visit(URL);
  });

  it('Waits for pokemons', () => {
    cy.wait(1500);
    cy.get('#pokemons').find('.pokemon').should('have.length', '12');
  });

  it('Ensures pokemon has valid data', () => {
    cy.get('#pokemons').find('.pokemon:first-child').then((pokemon) => {
        cy.get(pokemon).find('p').should('have.text', 'Bulbasaur');
        cy.get(pokemon).click().then(() => {
        cy.get('#modal').should('be.visible');
        cy.get('#modal').find('#modal-content')
        .should('contain.text', 'Bulbasaur')
        .should('contain.text', 'ID: 1')
        .should('contain.text', 'Height: 0.7 m')
        .should('contain.text', 'Weight: 6.9 kg')
        .should('contain.text', 'Type: Grass, Poison')
        .should('contain.text', 'Abilities: Overgrow, Chlorophyll');
        cy.get('#modal').find('.close').click().then(() => {
            cy.get('#modal').should('not.be.visible');
        });
      });
    });
  });

  it ('Ensures proper functioning of page buttons', () => {
    cy.get('#previous-page').click().then(() => {
        cy.get('#current-page').should('have.value', '1');
    });

    cy.get('#next-page').click().then(() => {
        cy.get('#current-page').should('have.value', '2');
    });

    cy.get('#current-page').clear().type('-5{enter}').then(() => {
        cy.get('#current-page').should('have.value', '1');
    });

    cy.wait(500);

    cy.get('#current-page').clear().type('10{enter}').then(() => {
        cy.get('#current-page').should('have.value', '10');
        cy.get('#pokemons').find('.pokemon:first-child').find('p').should('have.text', 'Koffing');
    });
  });
});


