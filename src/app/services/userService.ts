interface User {
  id: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  password: string;
  createdAt: string;
}

// Base de datos en memoria
let users: User[] = [];

export const getUsers = () => {
  return users.map(({ password, ...user }) => user); // No enviamos las contraseñas
};

export const saveUser = (user: User) => {
  users.push(user);
  return user;
};

export const getUserByEmail = (email: string) => {
  return users.find(user => user.email === email);
};

export const clearUsers = () => {
  users = [];
}; 