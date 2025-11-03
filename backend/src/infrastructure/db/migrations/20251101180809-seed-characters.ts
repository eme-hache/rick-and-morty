import { QueryInterface, DataTypes } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    console.log("Fetching characters from Rick and Morty API...");
    const response = await fetch(
      "https://rickandmortyapi.com/api/character/?page=1"
    );
    const data = await response.json();

    const apiCharacters = data.results.slice(0, 15);
    const charactersToInsert: any[] = [];

    for (const c of apiCharacters) {
      const exists = await queryInterface.rawSelect(
        "characters",
        { where: { rmId: c.id } },
        ["id"]
      );

      if (!exists) {
        charactersToInsert.push({
          rmId: c.id,
          name: c.name,
          status: c.status,
          species: c.species,
          gender: c.gender,
          image: c.image,
          origin: c.origin?.name || "unknown",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    if (charactersToInsert.length > 0) {
      console.log(`Inserting ${charactersToInsert.length} new characters...`);
      await queryInterface.bulkInsert("characters", charactersToInsert);
    } else {
      console.log("All characters already exist. Nothing to insert.");
    }
  },

  async down(queryInterface: QueryInterface) {
    console.log("Deleting seeded characters...");
    await queryInterface.bulkDelete("characters", {});
  },
};
