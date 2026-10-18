import { z } from 'zod';

export const UserSchema = z.object({
  user: z.object({
    email: z.string().email(),
    token: z.string().min(1),
    username: z.string().min(1),
    bio: z.string().nullable(),
    image: z.string().url().nullable().or(z.literal('')),
  }),
});

export type UserResponse = z.infer<typeof UserSchema>;

export interface NewUserPayload {
  user: {
    username: string;
    email: string;
    password: string;
  };
}