import { QueryInterface, DataTypes } from "sequelize";

/**
 * Migration to create the comments table
 */
export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    console.log("Creating comments table...");
    await queryInterface.createTable("comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    console.log("Dropping comments table...");
    await queryInterface.dropTable("comments");
  },
};
