import { test, expect } from '@playwright/test';
import { ArticlePage } from '../../src/pages/article.page';
import { AuthController } from '../../src/api/controllers/auth.controller';
import { UserFactory } from '../../src/data/user.factory';

test.describe('E2E: Creación de Artículos', () => {
  let articlePage: ArticlePage;

  test('Debe permitir crear un nuevo artículo desde la interfaz web', async ({ page, request }) => {
    // 1. Paso Híbrido: Registrar usuario vía API para obtener credenciales
    const authController = new AuthController(request);
    const newUser = UserFactory.createRandomUser();
    const { body: authBody } = await authController.registerUser(newUser);
    const token = authBody.user.token;

    // 2. Inyectar el Token en el LocalStorage del navegador para estar autenticados en UI
    await page.goto('/');
    await page.evaluate((jwtToken) => {
      window.localStorage.setItem('jwtToken', jwtToken);
    }, token);

    // 3. Navegar a la página del editor usando nuestro Page Object
    articlePage = new ArticlePage(page);
    await articlePage.goto();

    // 4. Llenar y enviar el formulario del artículo
    const articleTitle = `Artículo E2E ${Date.now()}`;
    const articleDesc = 'Descripción creada desde la prueba E2E';
    const articleBody = 'Contenido detallado del artículo generado en la interfaz de usuario.';

    await articlePage.createArticle(articleTitle, articleDesc, articleBody);

    // 5. Validación de UI: Verificar que redirige a la vista del artículo publicado
    await expect(page.getByRole('heading', { name: articleTitle })).toBeVisible();
  });
});