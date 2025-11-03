import { ICharacter } from "./character.entity";
import { IUser } from "./user.entity";

export interface IComment {
  id: number;
  userId: IUser["id"];
  characterId: ICharacter["id"];
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ICommentCreationAttributes extends Omit<IComment, "id"> {}
