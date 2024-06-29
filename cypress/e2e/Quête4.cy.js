describe("File upload and download tests", () => {
  beforeEach(() => {
    cy.visit("https://filebin.net/");
  });

  it("Upload file and download it in Zip format", () => {
    const filePath = 'images/Chaton.jpeg'; // chemin relatif à partir de cypress/fixtures

    cy.get("#fileField").attachFile(filePath);
    cy.contains("It contains 1 uploaded file").should("be.visible");
    cy.contains("Download files").click();
    cy.contains("Zip")
      .invoke("attr", "href")
      .then((downloadLink) => {
        const absoluteLink = "https://filebin.net" + downloadLink;
        cy.log(absoluteLink);
        cy.downloadFile(
          absoluteLink,
          "mydownloads/zipFiles",
          "downloadedFromCypress.zip"
        );
        cy.readFile("mydownloads/zipFiles/downloadedFromCypress.zip").should('exist');
      });
  });

  it("Upload file and download it in Tar format", () => {
    const filePath = 'images/Chaton.jpeg'; // chemin relatif à partir de cypress/fixtures

    cy.get("#fileField").attachFile(filePath);
    cy.contains("It contains 1 uploaded file").should("be.visible");
    cy.contains("Download files").click();
    cy.contains("Tar")
      .invoke("attr", "href")
      .then((downloadLink) => {
        const absoluteLink = "https://filebin.net" + downloadLink;
        cy.log(absoluteLink);
        cy.downloadFile(
          absoluteLink,
          "mydownloads/tarFiles",
          "downloadedFromCypress.tar"
        );
        cy.readFile("mydownloads/tarFiles/downloadedFromCypress.tar").should('exist');
      });
  });
});
