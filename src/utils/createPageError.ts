import { UserPayload } from '../controllers/page.controller';

export function createPageError(
  error: string = '',
  success: string = '',
  user: UserPayload | null = null
) {
  return {
    error,
    success,
    user,
  };
}
