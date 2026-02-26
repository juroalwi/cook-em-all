import { DataTypes } from "@sequelize/core";

export const dietModelCreator = (sequelize) => {
  sequelize.define("diet", {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  });
};
