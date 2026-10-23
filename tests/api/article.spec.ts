import { test, expect } from '@playwright/test';
import { AuthController } from '../../src/api/controllers/auth.controller';
import { ArticleController } from '../../src/api/controllers/article.controller';
import { ArticleResponseSchema } from '../../src/api/models/article.model';
import { UserFactory } from '../../src/data/user.factory';

test.describe('API: Gestión de Artículos', () => {
  // 1. Declaración de variables para el contexto de la suite
  let authController: AuthController;
  let articleController: ArticleController;

  test.beforeEach(async ({ request }) => {
    // 2. Creación de las instancias antes de cada prueba
    authController = new AuthController(request);
    articleController = new ArticleController(request);
  });

  test('Debe crear un artículo exitosamente y validar el contrato de respuesta', async () => {
    // Registro de usuario dinámico
    const newUser = UserFactory.createRandomUser();
    const { response: authResponse, body: authBody } = await authController.registerUser(newUser);

    expect(authResponse.status(), `Error al registrar: ${JSON.stringify(authBody)}`).toBe(201);

    const token = authBody.user.token;

    // Estructura del artículo conforme al Model
    const newArticlePayload = {
      article: {
        title: `Prueba Playwright ${Date.now()}`,
        description: 'Demostración de arquitectura de automatización',
        body: 'Este es el cuerpo del artículo creado mediante la API.',
        tagList: ['automation', 'playwright', 'typescript'],
      },
    };

    // 3. Uso de la instancia articleController en minúscula
    const response = await articleController.createArticle(newArticlePayload, token);

    // Validaciones
    expect(response.status()).toBe(201);

    const body = await response.json();

    // Validación de contrato con Zod
    const schemaValidation = ArticleResponseSchema.safeParse(body);
    expect(schemaValidation.success).toBe(true);

    expect(body.article.title).toBe(newArticlePayload.article.title);
  });
});