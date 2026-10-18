import { APIRequestContext, APIResponse } from '@playwright/test';
import { NewUserPayload, UserSchema, UserResponse } from '../models/user.model';

export class AuthController {
  private request: APIRequestContext;
  private apiBaseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.apiBaseUrl = process.env.API_URL || 'https://conduit-api.bondaracademy.com/api';
  }

  async registerUser(userData: NewUserPayload): Promise<{ response: APIResponse; body: UserResponse }> {
    const response = await this.request.post(`${this.apiBaseUrl}/users`, {
      data: userData,
    });

    const body = await response.json();
    return { response, body };
  }

  validateUserSchema(data: unknown): UserResponse {
    return UserSchema.parse(data);
  }
}