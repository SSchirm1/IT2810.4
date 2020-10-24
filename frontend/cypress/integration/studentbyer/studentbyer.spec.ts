const API =
  process.env.NODE_ENV === "test"
    ? "http://locahost:8000/api/"
    : "http://it2810-72.idi.ntnu.no:3000/api/";

describe("Checks if studentbyer are loaded", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.waitForReact();
  });

  it("Clicks on button for adding more studentbyer and checks that these are loaded", () => {
    cy.server();
    cy.route(
      "GET",
      `${API}studentbyer?skip=0&take=2&sort=inverseAlphabetical&querystring=`
    ).as("getStudentbyer1");
    //cy.get("button")
    //  .contains("1")
    //  .click();

    // wait for GET /api/studentbyer
    const k = cy
      .get("select")
      .eq(1)
      .select("Alfabetisk Å -> A");
    console.log("K: ", k);

    cy.wait("@getStudentbyer1", { timeout: 10000 }).should(response => {
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
