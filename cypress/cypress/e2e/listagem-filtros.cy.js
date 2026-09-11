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

    it('CT16 - Deve ordenar os produtos por preco crescente', () => {
        cy.get('[data-test="product-sort-container"]').select('Price (low to high)');
 
        cy.get('[data-test="inventory-item-price"]').then(($precos) => {
            const valores = [...$precos].map((e) => Number(e.innerText.replace('$', '')));
            const crescente = [...valores].sort((a, b) => a - b);
            expect(valores).to.deep.equal(crescente);
            expect(valores[0]).to.equal(Math.min(...valores));
        });
    });
});