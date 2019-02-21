// https://docs.cypress.io/api/introduction/api.html

describe('Group Details Page', () => {
  it('should contain all categories information of a group', () => {
    cy.visit('/#/groups/group1');
    cy.get('.group-details')
      .find('p.title')
      .should('contain', 'Monthly')
      .should('contain', '15.700.000');
    cy.get('.group-details')
      .find('div[role=listitem]')
      .should('have.length', 3);
  });

  it('should order categories by amount and name', () => {
    cy.visit('/#/groups/group1');
    cy.get('.group-details')
      .find('div[role=listitem]')
      .should(($listItem) => {
        let actionTextEle;
        expect($listItem.eq(0).find('.v-list__tile__title')).to.contain('salary');
        actionTextEle = $listItem.eq(0).find('.v-list__tile__action-text');
        expect(actionTextEle).to.contain('18.000.000');
        expect(actionTextEle[0].className).to.match(/blue--text/);
        expect($listItem.eq(1).find('.v-list__tile__title')).to.contain('market');
        actionTextEle = $listItem.eq(1).find('.v-list__tile__action-text');
        expect(actionTextEle).to.contain('-1.500.000');
        expect(actionTextEle[0].className).to.match(/red--text/);
        expect($listItem.eq(2).find('.v-list__tile__title')).to.contain('study');
        actionTextEle = $listItem.eq(2).find('.v-list__tile__action-text');
        expect(actionTextEle).to.contain('-2.300.000');
        expect(actionTextEle[0].className).to.match(/red--text/);
      });
  });
});
