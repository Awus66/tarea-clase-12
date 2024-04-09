/// <reference types="Cypress" />

const URL = '127.0.0.1:8080/exchange/index.html';

context('Currency exchange rates',{ testIsolation: false }, () => {
  before(() =>{
    cy.visit(URL);
  });
});
