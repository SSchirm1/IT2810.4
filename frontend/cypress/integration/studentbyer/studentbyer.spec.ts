const API = Cypress.env('API_SERVER') ?? "http://it2810-72.idi.ntnu.no/api";
console.log("API: ", API)

describe("Checks if studentbyer are loaded", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.waitForReact();
  });
  it("Clicks on button for adding more studentbyer and checks that these are loaded", () => {
    cy.server();
    cy.route(
      "GET",
      `${API}/studentbyer?take=4&skip=0&sort=inverseAlphabetical&querystring=&filter=`
    ).as("getStudentbyer1");
    //cy.get("button")
    //  .contains("1")
    //  .click();

    // wait for GET /api/studentbyer
    const k = cy
      .get("select")
      .eq(1)
      .select("Alfabetisk Å -> A");

    cy.wait("@getStudentbyer1", { timeout: 5000 }).should(response => {
      expect(response.status).to.eq(200);
      expect(response.responseBody).to.have.property("count", 10);
    });

    cy.getReact("StudentCityCard").should("have.length", 4);

    // Checks that new button appears
    //cy.get("button").contains("3");
    // Checks that new button appears
    //cy.get("button").contains("4");
  });
});
