const API =
  Cypress.env("API_SERVER") ?? "http://it2810-72.idi.ntnu.no:3000/api";
console.log("API: ", API);

describe("Checks if studentbyer are loaded", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.waitForReact();
  });
  it("Clicks on button for adding more studentbyer and checks that these are loaded", () => {
    cy.server();

    //tests that choosing sort gives right API call, that response contains 10 studentCities and that 4 studentCities are displayed in StudentCityCards
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
    console.log("c: ", cy.getReact("StudentCityCard"));
    cy.getReact("StudentCityCard").should("have.length", 4);

    //test that checks that choosing a city results in the right API-call, and checks that the response contains 5 studentCities
    cy.route(
      "GET",
      `${API}/studentbyer?take=4&skip=0&sort=inverseAlphabetical&querystring=&filter=1`
    ).as("getStudentbyerBy=Oslo");
    const l = cy
      .get("select")
      .eq(0)
      .select("Oslo");
    cy.wait("@getStudentbyerBy=Oslo", { timeout: 5000 }).should(response => {
      expect(response.status).to.eq(200);
      expect(response.responseBody).to.have.property("count", 5);
    });
    //Tests that writing 'a' as input gives API-call with querystring=a, and >0 studentcities are returned
    cy.route(
      "GET",
      `${API}/studentbyer?take=4&skip=0&sort=inverseAlphabetical&querystring=a&filter=1`
    ).as("getStudentbyerNavn=a");
    const n = cy.get("input").type("a");
    cy.wait("@getStudentbyerNavn=a", { timeout: 5000 }).should(response => {
      expect(response.status).to.eq(200);
      expect(response.responseBody)
        .to.have.property("count")
        .greaterThan(0);
    });

    //Tests that writing 123 as input gives API-call with querystring=123, and 0 studentcities are returned
    cy.route(
      "GET",
      `${API}/studentbyer?take=4&skip=0&sort=inverseAlphabetical&querystring=a123&filter=1`
    ).as("getStudentbyerNavn=123");
    const m = cy.get("input").type("123");
    cy.wait("@getStudentbyerNavn=123", { timeout: 5000 }).should(response => {
      expect(response.status).to.eq(200);
      expect(response.responseBody).to.have.property("count", 0);
      //TODO: teste at det står 'Ingen resultater'
    });
  });
});
