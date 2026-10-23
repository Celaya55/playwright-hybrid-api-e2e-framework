import { APIRequestContext, APIResponse } from '@playwright/test';
import { CreateArticlePayload } from '../models/article.model';

export class ArticleController {
  private request: APIRequestContext;
  private apiEndpoint = `${process.env.API_URL || 'https://conduit-api.bondaracademy.com/api'}/articles`;

  constructor(request: APIRequestContext) {
    this.request = request;
  }
  // Método para enviar la petición POST de creación de artículo
  async createArticle(payload: CreateArticlePayload, token: string): Promise<APIResponse> {
    return await this.request.post(this.apiEndpoint, {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
  }
}
