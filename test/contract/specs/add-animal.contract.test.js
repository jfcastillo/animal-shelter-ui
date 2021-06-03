import { provider } from './init-pact';
import { AnimalController } from "../../../controllers";
import { Matchers } from "@pact-foundation/pact";

const animal = {
    name: "Lisa",
    breed: "Criolla",
    gender: "Female",
    vaccinated: true
}
describe('Given an Animal Service', () => {
    // beforeAll(async () => {
    //     await provider.setup();
    // });
    describe('When a request to add a new animal is made', () => {
        beforeAll(async () => {
            await provider.setup();
            await provider.addInteraction({
                state: 'create animal',
                uponReceiving: 'a request to add a new animal',
                withRequest: {
                    method: 'POST',
                    path: '/animals',
                    body: animal,
                },
                willRespondWith: {
                    status: 201,
                    body: Matchers.like(animal)
                }
            });
        });
        it("Then it should return the right data", async () => {
            const response = await AnimalController.register(animal);
            expect(response.data).toMatchSnapshot();
            await provider.verify();
        });
    });
    afterAll(async () => {
        await provider.finalize();
    })
});