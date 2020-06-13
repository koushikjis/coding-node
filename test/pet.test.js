const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('functional - pet', () => {
    it('should create a pet', async () => {
        const pet = {
            name: "Tommy",
            age: 3,
            colour: "pale yellow"
        }

        const res = await request(app).post('/pets').send(pet);

        expect(res.status).to.equal(201);
        expect(res.body.name).to.equal(pet.name);
        expect(res.body.age).to.equal(pet.age);
        expect(res.body.colour).to.equal(pet.colour);
    })

    it('should fail create a pet with missing required field', async () => {
        const pet = {
            name: "Tommy",
            age: 3,
        }

        const res = await request(app).post('/pets').send(pet);

        expect(res.status).to.equal(400);
    })

    it('should fail to return a pet with wrong name', async () => {
        const petName = "Baxter";
        const res = await request(app).get(`/pets/${petName}`)

        expect(res.status).to.equal(204)
    })

    it('should return a pet', async () => {
        const petName = "Tommy";
        const res = await request(app).get(`/pets/${petName}`)

        expect(res.status).to.equal(200)
        expect(res.body[0].name).to.equal(petName)
    })

    it('should delete a pet', async () => {
        const petName = "Tommy";
        const res = await request(app).delete(`/pets/${petName}`)

        expect(res.status).to.equal(200)
    })

    it('should fail to delete, with invalid name', async () => {
        const petName = "Tony";
        const res = await request(app).delete(`/pets/${petName}`)

        expect(res.status).to.equal(204)
    })
})