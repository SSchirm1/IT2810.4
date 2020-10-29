const API =
  Cypress.env("API_SERVER") ?? "http://it2810-72.idi.ntnu.no:3000/api";
console.log("API: ", API);

describe("Checks if studentbyer are loaded", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.waitForReact();
  });
  it("Clicks on button for reversing order of student cities, checks that the right API-call is called, checks that it is in total 10 student cities and 4 are displayed frontend", () => {
    cy.server();
    cy.route(
      "GET",
      `${API}/studentbyer?take=4&skip=0&sort=inverseAlphabetical&querystring=&filter=`
    ).as("getStudentbyer1");

    // wait for GET /api/studentbyer
    cy.get("select")
      .eq(1)
      .select("Alfabetisk Å -> A");

    cy.wait("@getStudentbyer1", { timeout: 5000 }).should(response => {
      expect(response.status).to.eq(200);
      expect(response.responseBody).to.have.property("count", 10);
    });
    cy.getReact("StudentCityCard");
  });

  it("Clicks on button for showing only studentcities from Oslo and checks that it is in total 5 student cities and student cities are displayed frontend", () => {
    cy.server();
    cy.route(
      "GET",
      `${API}/studentbyer?take=4&skip=0&sort=alphabetical&querystring=&filter=1`
    ).as("getStudentbyerBy=Oslo");

    cy.get("select")
      .eq(0)
      .select("Oslo");
    // wait for GET /api/studentbyer
    cy.wait("@getStudentbyerBy=Oslo", { timeout: 5000 }).should(response => {
      expect(response.status).to.eq(200);
      expect(response.responseBody).to.have.property("count", 5);
    });
    cy.getReact("StudentCityCard");
  });

  it("Clicks pagination-button 'right-arrow' and checks that the right API-call and 4 student cities is displayed", () => {
    cy.server();
    cy.route(
      "GET",
      `${API}/studentbyer?take=4&skip=4&sort=alphabetical&querystring=&filter=`
    ).as("getStudentbyerSkip=4");
    console.log(cy.getReact("button"));
    cy.wait(2000);
    cy.get("Button")
      .last()
      .click();

    // wait for GET /api/studentbyer
    cy.wait("@getStudentbyerSkip=4", { timeout: 5000 }).should(response => {
      expect(response.status).to.eq(200);
      expect(response.responseBody).to.have.property("count", 10);
    });
    cy.getReact("StudentCityCard");
  });
  it("Writes 'a' as input for student city name gives API-call with querystring=a, and >0 studentcities are returned", () => {
    cy.server();
    cy.route(
      "GET",
      `${API}/studentbyer?take=4&skip=0&sort=alphabetical&querystring=a&filter=`
    ).as("getStudentbyerNavn=a");
    cy.get("input").type("a");
    // wait for GET /api/studentbyer
    cy.wait("@getStudentbyerNavn=a", { timeout: 5000 }).should(response => {
      expect(response.status).to.eq(200);
      expect(response.responseBody)
        .to.have.property("count")
        .greaterThan(0);
    });
  });
  it("Writes '123' as input for student city name gives API-call with querystring=123, and 0 studentcities are returned", () => {
    cy.server();
    cy.route(
      "GET",
      `${API}/studentbyer?take=4&skip=0&sort=alphabetical&querystring=123&filter=`
    ).as("getStudentbyerNavn=123");
    cy.get("input").type("123");
    cy.wait("@getStudentbyerNavn=123", { timeout: 5000 }).should(response => {
      expect(response.status).to.eq(200);
      expect(response.responseBody).to.have.property("count", 0);
    });
    cy.contains("Ingen studentbyer samsvarer med søket");
  });
});
