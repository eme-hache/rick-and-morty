import { Model, DataTypes } from "sequelize";
import type {
  ICharacter,
  ICharacterCreationAttributes,
} from "../../../domain/entities/character.entity";
import { sequelize } from "../sequelize";

export class Character
  extends Model<ICharacter, ICharacterCreationAttributes>
  implements ICharacter
{
  declare id: number;
  declare rmId: number;
  declare name: string;
  declare status: string;
  declare species: string;
  declare gender: string;
  declare image: string;
  declare origin: string;
  declare favoritesCount: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;
}

Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rmId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: DataTypes.STRING,
    species: DataTypes.STRING,
    gender: DataTypes.STRING,
    origin: DataTypes.STRING,
    image: DataTypes.STRING,
    favoritesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "Character",
    tableName: "characters",
    timestamps: true,
    paranoid: true,
  }
);
