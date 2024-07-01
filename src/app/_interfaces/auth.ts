import { User } from './user';

/**
 * Represents the authentication information.
 */
/**
 * Represents the authentication information.
 */
export interface Auth {
  /**
   * The user that is authenticated.
   */
  user: User;

  /**
   * The authentication token.
   */
  token: string;
}
