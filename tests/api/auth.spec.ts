import { test, expect } from '@playwright/test';
import { AuthController } from '../../src/api/controllers/auth.controller';
import { UserFactory } from '../../src/data/user.factory';

test.describe('API - User Management & Schema Validation', () => {
  let authController: AuthController;

  test.beforeEach(async ({ request }) => {
    authController = new AuthController(request);
  });

  test('POST /api/users - Debería registrar un nuevo usuario con esquema válido', async () => {
    const newUser = UserFactory.createRandomUser();

    const { response, body } = await authController.registerUser(newUser);

    expect(response.status()).toBe(201);
    expect(body.user.email).toBe(newUser.user.email);
    expect(body.user.username).toBe(newUser.user.username);
    expect(body.user.token).toBeTruthy();

    const validation = () => authController.validateUserSchema(body);
    expect(validation).not.toThrow();
  });
});