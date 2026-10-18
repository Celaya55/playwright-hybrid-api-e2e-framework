import { faker } from '@faker-js/faker';
import { NewUserPayload } from '../api/models/user.model';

export class UserFactory {
  static createRandomUser(): NewUserPayload {
    const timestamp = Date.now();
    return {
      user: {
        username: `qa_${faker.internet.username().toLowerCase().replace(/[^a-z0-9]/g, '')}_${timestamp}`.slice(0, 20),
        email: `qa_${timestamp}_${faker.internet.email().toLowerCase()}`,
        password: `Pass_${faker.internet.password({ length: 10 })}!`,
      },
    };
  }
}