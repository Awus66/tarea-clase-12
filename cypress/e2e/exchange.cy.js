/// <reference types="Cypress" />

const URL = '127.0.0.1:8080/exchange/index.html';

context('Currency exchange rates',{ testIsolation: false }, () => {
  before(() =>{
    cy.visit(URL);
  });

  it('Submits invalid input', () => {
    cy.get('form').find('#amount').clear().type('-5').then(() => {
      cy.get('form').find('#submit-button').click().then(() => {
        cy.get('.error').should('have.length', '1');
        cy.get('#errors').should('have.text', '"Amount" must be a number greater than 0');
      });
    });
  });

  it('Submits valid input', () => {
    describe('Only amount was chosen', () => {
      cy.get('form').find('#amount').clear().type('4').then(() => {
        cy.get('form').find('#submit-button').click().then(() => {
          cy.wait(500);
          cy.get('#data').should('contain.text', 'Exchange Rates for 4 EUR on ');
          cy.get('.error').should('have.length', '0');
          cy.get('#errors').should('have.text', '');
          cy.get('#data').find('li').should('have.length', '30');
        });
      });
    });

    describe('startDate and endDate were chosen', () => {
      cy.get('form').find('#from').select('USD');
      cy.get('form').find('#to').select('CAD');
      cy.get('form').find('#start-date').click().type('2024-04-02');
      cy.get('form').find('#end-date').click().type('2024-04-05');
      cy.get('form').find('#amount').clear().type('4').then(() => {
        cy.get('form').find('#submit-button').click().then(() => {
          cy.get('#data').should('contain.text', 'Exchange Rates for 4 USD to CAD on 2024-04-02 - 2024-04-05');
          cy.get('.error').should('have.length', '0');
          cy.get('#errors').should('have.text', '');
          cy.get('#data').find('li').should('have.length', '4');
        });
      });
    });

    describe('Only startDate was chosen', () => {
      cy.get('form').find('#start-date').click().type('2024-04-03');
      cy.get('form').find('#end-date').click().clear();
      cy.get('form').find('#amount').clear().type('1').then(() => {
        cy.get('form').find('#submit-button').click().then(() => {
          cy.get('#data').should('contain.text', 'Exchange Rates for 1 USD to CAD on 2024-04-03 - ');
          cy.get('.error').should('have.length', '0');
          cy.get('#errors').should('have.text', '');
          cy.get('#data').find('li').should(($li) => {
            expect($li).to.have.length.at.least(1);
          });
        });
      });
    });

    describe('Only endDate was chosen', () => {
      cy.get('form').find('#start-date').click().clear();
      cy.get('form').find('#end-date').click().type('2024-04-03').then(() => {
        cy.get('form').find('#submit-button').click().then(() => {
          cy.get('#data').should('contain.text', 'Exchange Rates for 1 USD to CAD on 2024-04-03');
          cy.get('.error').should('have.length', '0');
          cy.get('#errors').should('have.text', '');
          cy.get('#data').find('li').should('have.length', '1');
        });
      });
    });

  });
});
