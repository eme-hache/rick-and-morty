import { QueryInterface, DataTypes } from "sequelize";

/**
 * Migration to create the characters table
 */
export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    console.log("Creating characters table...");
    await queryInterface.createTable("characters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      rmId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
      },
      species: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      origin: {
        type: DataTypes.STRING,
      },
      favoritesCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    console.log("Dropping characters table...");
    await queryInterface.dropTable("characters");
  },
};
