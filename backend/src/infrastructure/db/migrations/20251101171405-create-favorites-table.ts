import { QueryInterface, DataTypes } from "sequelize";

/**
 * Migration to create the favorites table
 */
export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    console.log("Creating favorites table...");
    await queryInterface.createTable("favorites", {
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
    });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    console.log("Dropping favorites table...");
    await queryInterface.dropTable("favorites");
  },
};
