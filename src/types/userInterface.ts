import { Model } from "sequelize";

interface IUser extends Model {
  id: number;
  email: string;
  password: string;
}

export default IUser;
