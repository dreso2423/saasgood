// queries.test.js
const db = require('./db');
const { addUser, getUser, updateUser, deleteUser } = require('./queries');

beforeAll(async () => {
    // Setup: create a test user
    const userData = {
        name: 'Test User',
        email_address: 'testuser1@email.com', // updated email address
        company_id: 1,
        role: 'admin',
        hashed_password: 'test_hashed_password',
        api_key: 'test_api_key'
    };
    const result = await addUser(userData);
    this.userId = result.rows[0].id;
});

afterAll(async () => {
    // Teardown: delete the test user
    await deleteUser(this.userId);
    // Close the database connection
    await db.end();
});

test('getUser returns the correct user', async () => {
    const result = await getUser(this.userId);
    expect(result.rows[0].id).toBe(this.userId);
});

test('updateUser updates the user details', async () => {
    const newUserData = {
        name: 'Updated User',
        email_address: 'updateduser1@email.com', // updated email address
        company_id: 1,
        role: 'admin',
        hashed_password: 'updated_test_hashed_password',
        api_key: 'updated_test_api_key'
    };
    const result = await updateUser(this.userId, newUserData);
    expect(result.rows[0].name).toBe('Updated User');
});

test('deleteUser deletes the user', async () => {
    const result = await deleteUser(this.userId);
    expect(result.rowCount).toBe(1);
});