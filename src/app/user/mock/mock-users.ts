import { User } from '@/app/user/domain/user';

/**
 * Liste des utilisateurs prédéfinis.
 * @type {User[]}
 */
export const USERS: User[] = [
  {
    id: 1,
    userName: '242darkman',
    firstName: 'Brandon',
    lastName: 'VOUVOU',
    email: 'bvouvou2@myges.fr',
    password: '$2a$10$B16ws8u/Y0J8TJitdmdF5epN5YVQHr587Wi2ma0RSGFv4cpX4Y/Xm',
    roles: ['user', 'admin'],
  },
  {
    id: 2,
    userName: 'lanskei',
    firstName: 'Lansana',
    lastName: 'KEITA',
    email: 'lkeita2@myges.fr',
    password: '$2a$10$B16ws8u/Y0J8TJitdmdF5epN5YVQHr587Wi2ma0RSGFv4cpX4Y/Xm',
    roles: ['user', 'admin'],
  },
  {
    id: 3,
    userName: 'nalvac',
    firstName: 'Nalvac',
    lastName: 'ATINHOUNON',
    email: 'natinhounon@myges.fr',
    password: '$2a$10$B16ws8u/Y0J8TJitdmdF5epN5YVQHr587Wi2ma0RSGFv4cpX4Y/Xm',
    roles: ['user', 'admin'],
  },
  {
    id: 4,
    userName: 'jdoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'jdoe@myges.fr',
    password: '$2a$10$B16ws8u/Y0J8TJitdmdF5epN5YVQHr587Wi2ma0RSGFv4cpX4Y/Xm',
    roles: ['user'],
  },
];
