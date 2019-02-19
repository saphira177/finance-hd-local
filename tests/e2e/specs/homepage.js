// https://docs.cypress.io/api/introduction/api.html

describe('Homepage', () => {
  it('Visits homepage', () => {
    cy.visit('/');
    cy.get('.v-toolbar')
      .find('.v-toolbar__title')
      .should('have.text', 'FINANCE HD');
    cy.get('.v-content__wrap')
      .find('div[role=listitem]')
      .find('a')
      .should(($item) => {
        expect($item).to.have.length(2);
        expect($item.first().find('.v-list__tile__title')).to.contain('Monthly');
        expect($item.eq(1).find('.v-list__tile__title')).to.contain('Rent');
      });
  });
});
