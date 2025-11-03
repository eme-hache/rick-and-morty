export interface IUser {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IUserCreationAttributes extends Omit<IUser, "id"> {}
