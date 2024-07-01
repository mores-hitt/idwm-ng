import { Gender } from './gender';
import { Role } from './role';

/**
 * Represents a user in the system.
 */
export interface User {
  /**
   * The unique identifier of the user.
   */
  id: number;

  /**
   * The national identification number (RUT) of the user.
   */
  rut: string;

  /**
   * The name of the user.
   */
  name: string;

  /**
   * The birthday of the user.
   */
  birthday: Date;

  /**
   * The email address of the user.
   */
  email: string;

  /**
   * Indicates whether the user is active or not.
   */
  isActive: boolean;

  /**
   * The gender of the user.
   */
  gender: Gender;

  /**
   * The role of the user.
   */
  role: Role;
}
