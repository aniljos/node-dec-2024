import {ProductRepository} from '../repository/product-repository';


describe("Product-repository", () => {

    test("fetchAll", () => {

        const repository = new ProductRepository();
        const result = repository.fetchAll();

        expect(result.length).toBe(4);
    })

    test("save", () => {

        const repository = new ProductRepository();
        const result = repository.fetchAll();
        expect(result.length).toBe(4);

        repository.save("p1", 1000, "d1");

        const updatedResults = repository.fetchAll();
        expect(updatedResults.length).toBe(5);

        expect(updatedResults[4].name).toBe("p1")
        expect(updatedResults[4].price).toBe(1000)
        expect(updatedResults[4].description).toBe("d1")


    })
})