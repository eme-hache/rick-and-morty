import { Model, DataTypes } from "sequelize";
import type {
  IFavorite,
  IFavoriteCreationAttributes,
} from "../../../domain/entities/favorite.entity";
import { sequelize } from "../sequelize";

export class Favorite
  extends Model<IFavorite, IFavoriteCreationAttributes>
  implements IFavorite
{
  declare id: number;
  declare userId: number;
  declare characterId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "characters",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Favorite",
    tableName: "favorites",
    timestamps: true,
  }
);
