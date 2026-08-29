describe('Listagem e filtros', () => {
    beforeEach(() => {
        cy.autenticar();
    });

    it('CT05 - Deve ordenar os produtos em ordem alfabedica decrescente', () => {
        cy.get('[data-test="product-sort-container"]').select('Name (Z to A)');

        cy.get('[data-test="inventory-item-name"]').then(($nomes) => {
            const nomes = [...$nomes].map((e) => e.innerText);
            const decrescente = [...nomes].sort().reverse();
            expect(nomes).to.deep.equal(decrescente);
            expect(nomes[0]).to.equal(decrescente[0]);
        });
    });
});