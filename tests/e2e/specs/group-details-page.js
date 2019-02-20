// https://docs.cypress.io/api/introduction/api.html

describe('Group Details Page', () => {
  it('Visits Group details page', () => {
    cy.visit('/#/groups/group1');
    cy.get('.group-details')
      .find('p.title')
      .should('contain', 'Monthly')
      .should('contain', '15.700.000');
    cy.get('.group-details')
      .find('div[role=listitem]')
      .should('have.length', 3);
  });
});
