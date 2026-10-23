import { z } from 'zod';
// Define el esquema de validación para la respuesta que nos devuelve el servidor
export const ArticleResponseSchema = z.object({
  article: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    body: z.string(),
    tagList: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});
// Define la estructura que aceptara la API
export interface CreateArticlePayload {
  article: {
    title: string;
    description: string;
    body: string;
    tagList?: string[]; // El signo '?' significa que este campo es opcional
  };
}