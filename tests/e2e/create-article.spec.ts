import { test, expect } from '@playwright/test';
import { ArticlePage } from '../../src/pages/article.page';
import { AuthController } from '../../src/api/controllers/auth.controller';
import { UserFactory } from '../../src/data/user.factory';

test.describe('E2E: Creación de Artículos', () => {
  let articlePage: ArticlePage;

  test('Debe permitir crear un nuevo artículo desde la interfaz web', async ({ page, request }) => {
    let token: string;
    const articleTitle = `Artículo E2E ${Date.now()}`;
    const articleDesc = 'Descripción creada desde la prueba E2E';
    const articleBody = 'Contenido detallado del artículo generado en la interfaz de usuario.';

    await test.step('1. Autenticar usuario vía API e inyectar Token en LocalStorage', async () => {
      const authController = new AuthController(request);
      const newUser = UserFactory.createRandomUser();
      const { body: authBody } = await authController.registerUser(newUser);
      token = authBody.user.token;

      await page.goto('/');
      await page.evaluate((jwtToken) => {
        window.localStorage.setItem('jwtToken', jwtToken);
      }, token);
    });

    await test.step('2. Navegar al editor de artículos', async () => {
      articlePage = new ArticlePage(page);
      await articlePage.goto();
    });

    await test.step('3. Llenar y enviar formulario del artículo', async () => {
      await articlePage.createArticle(articleTitle, articleDesc, articleBody);
    });

    await test.step('4. Validar publicación del artículo en la UI', async () => {
      await expect(page.getByRole('heading', { name: articleTitle })).toBeVisible();
    });
  });
});