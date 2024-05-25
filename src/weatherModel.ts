import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "./pgConfig";

interface WeatherAttributes {
  city: string;
  country: string;
  weather: string;
  time: Date;
  longitude: number;
  latitude: number;
}

class Weather extends Model<WeatherAttributes> implements WeatherAttributes {
  public city!: string;
  public country!: string;
  public weather!: string;
  public time!: Date;
  public longitude!: number;
  public latitude!: number;
}

Weather.init(
  {
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weather: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize.sequelize, 
    tableName: 'weather',
    timestamps: false,
  }
);

export { Weather };
