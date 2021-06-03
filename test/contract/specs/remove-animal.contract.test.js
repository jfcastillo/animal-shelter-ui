import { provider } from './init-pact';
import { AnimalController } from "../../../controllers";
import { Matchers } from "@pact-foundation/pact";

const animalName = "Lisa"
describe('Given an Animal Service', () => {
    // beforeAll(async () => {
    //     await provider.setup();
    // });
    describe('When a request to remove an animal is made', () => {
        beforeAll(async () => {
            await provider.setup();
            await provider.addInteraction({
                state: 'remove animal',
                uponReceiving: 'a request to remove an animal',
                withRequest: {
                    method: 'DELETE',
                    path: `/animals/${animalName}`,
                },
                willRespondWith: {
                    status: 204,

                }
            });
        });
        it("Then it should return the right data", async () => {
            const response = await AnimalController.delete(animalName);
            expect(response.data).toMatchSnapshot();
            await provider.verify();
        });
    });
    afterAll(async () => {
        await provider.finalize();
    })
});