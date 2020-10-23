describe('Checks if studentbyer are loaded', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

    it('Clicks on button for adding more studentbyer and checks that these are loaded', () => {
      cy.server();
      cy.route('GET', 'http://localhost:8000/api/studentbyer?skip=2&take=2&sort=&querystring=').as('getStudentbyer');
      cy.get('button').contains("1").click();

    // wait for GET /api/studentbyer
      cy.wait('@getStudentbyer').should((response) => {
        expect(response.status).to.eq(200)
        expect(response.responseBody).to.have.property("count", 10)
      });

      // Checks that new button appears
      cy.get("button").contains("3");
      // Checks that new button appears
      cy.get("button").contains("4");
    })
  })