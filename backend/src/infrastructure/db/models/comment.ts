import { Model, DataTypes } from "sequelize";
import type {
  IComment,
  ICommentCreationAttributes,
} from "../../../domain/entities/comment.entity";
import { sequelize } from "../sequelize";

export class Comment
  extends Model<IComment, ICommentCreationAttributes>
  implements IComment
{
  declare id: number;
  declare userId: number;
  declare characterId: number;
  declare content: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;
}

Comment.init(
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
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
    timestamps: true,
    paranoid: true,
  }
);
