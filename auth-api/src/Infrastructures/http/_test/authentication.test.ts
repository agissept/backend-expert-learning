import pool from "../../database/postgres/pool";
import UsersTableTestHelper from "../../../../tests/UsersTableTestHelper";
import AuthenticationsTableTestHelper from "../../../../tests/AuthenticationsTableTestHelper";
import createServer from "../createServer";
import container from "../../container";


describe('/authentications endpoint', () => {
    afterAll(async () => {
        await pool.end();
    });

    beforeEach(async () => {
        await UsersTableTestHelper.cleanTable();
        await AuthenticationsTableTestHelper.cleanTable();
    });

    afterEach(async () => {
        await UsersTableTestHelper.cleanTable()
    })


    describe('when POST /authentications', () => {


        it('should response 201 and new authentication', async () => {
            // Arrange
            const requestPayload = {
                username: 'xxx',
                password: 'secret',
            };
            const server = await createServer(container);
            // add user
            await server.inject({
                method: 'POST',
                url: '/users',
                payload: {
                    username: 'xxx',
                    password: 'secret',
                    fullname: 'Dicoding Indonesia',
                },
            });

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/authentications',
                payload: requestPayload,
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.accessToken).toBeDefined();
            expect(responseJson.data.refreshToken).toBeDefined();
        });

        it('should response 400 if username not found', async () => {
            // Arrange
            const requestPayload = {
                username: 'dicoding',
                password: 'secret',
            };
            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/authentications',
                payload: requestPayload,
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('username tidak ditemukan');
        });

        it('should response 401 if password wrong', async () => {
            // Arrange
            const requestPayload = {
                username: 'dicoding',
                password: 'wrong_password',
            };
            const server = await createServer(container);
            // Add user
            await server.inject({
                method: 'POST',
                url: '/users',
                payload: {
                    username: 'dicoding',
                    password: 'secret',
                    fullname: 'Dicoding Indonesia',
                },
            });

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/authentications',
                payload: requestPayload,
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(401);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('kredensial yang Anda masukkan salah');
        });

        it('should response 400 if login payload not contain needed property', async () => {
            // Arrange
            const requestPayload = {
                username: 'dicoding',
            };
            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/authentications',
                payload: requestPayload,
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('harus mengirimkan username dan password');
        });

        it('should response 400 if login payload wrong data type', async () => {
            // Arrange
            const requestPayload = {
                username: 123,
                password: 'secret',
            };
            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/authentications',
                payload: requestPayload,
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('username dan password harus string');
        });
    });
});
