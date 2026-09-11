import { expect, test } from "../fixtures/paginas";

test.describe('Listagem e filtros', () => {
    test('CT05 - Deve ordenar os produtos em ordem alfabetica decrescente', async ({ autenticado }) => {
        await test.step('Quando escolhe a opcao "Name (Z to A)" no seletor de ordenacao', async () => {
            await autenticado.ordenarPor('Name (Z to A)')
        });

        await test.step('Entao a lista inteira sai em ordem decrescente, com o maior nome primeiro', async () => {
            const nomes = await autenticado.listarNomes();
            const decrescente = [...nomes].sort().reverse();
            expect(nomes).toEqual(decrescente);
            expect(nomes[0]).toEqual(decrescente[0]);
        });
    })

    test('CT16 - Deve ordenar os produtos por preco crescente', async ({ autenticado }) => {
        await test.step('Quando escolhe a opcao "Price (low to high)" no seletor de ordenacao', async () => {
            await autenticado.ordenarPor('Price (low to high)')
        });
 
        await test.step('Entao a lista inteira sai em ordem crescente, com o menor preco primeiro', async () => {
            const precos = await autenticado.listarPrecos();
            const crescente = [...precos].sort((a, b) => a - b);
            expect(precos).toEqual(crescente);
            expect(precos[0]).toEqual(Math.min(...precos));
        });
    })
});