import request from 'supertest';
import { app, start, stop } from '../index';

describe('Auth tests', () => {
	beforeAll(async (done) => {
		await start();
		done();
	});

	afterAll((done) => {
		stop();
		done();
	});

	test('server health check', async (done) => {
        try {
			const response = await request(app).get('/ping');
			expect(response.status).toBe(200);
            expect(response.body.content).toBe('pong')
		} catch (err) {
			throw new Error(err);
		} finally {
			done();
		}
	});
});