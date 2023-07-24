/**
 * Cette interface définit le type d'un objet User.
 */
export interface User {
  /**
   * Identifiant unique de l'utilisateur.
   */
  id: number;

  /**
   * Nom d'utilisateur utilisé pour la connexion.
   */
  userName: string;

  /**
   * Prénom de l'utilisateur.
   */
  firstName: string;

  /**
   * Nom de famille de l'utilisateur.
   */
  lastName: string;

  /**
   * Adresse e-mail de l'utilisateur.
   */
  email: string;

  /**
   * Mot de passe de l'utilisateur.
   */
  password: string;

  /**
   * Tableau de chaînes représentant les rôles attribués à l'utilisateur.
   */
  roles: string[];
}
