import { Model, DataTypes } from "sequelize";
import type {
  IUser,
  IUserCreationAttributes,
} from "../../../domain/entities/user.entity";
import { sequelize } from "../sequelize";

export class User
  extends Model<IUser, IUserCreationAttributes>
  implements IUser
{
  declare id: number;
  declare name: string;
  declare email: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    paranoid: true,
  }
);
