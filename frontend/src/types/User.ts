export interface User {
  _id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserResponse {
  createUser: User;
}
