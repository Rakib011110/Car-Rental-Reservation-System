import { User } from "./user.model";
import { TUser } from "./users.interface";
import bcrypt from "bcrypt";

const createUserIntoDB = async (payload: Partial<TUser>) => {
  const { password, ...rest } = payload;
  const hashedPassword = await bcrypt.hash(password as string, 10);
  const userData = {
    ...rest,
    password: hashedPassword,
    role: payload.role || "user",
  };

  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (err: any) {
    throw new Error(`Error creating user: ${err.message}`);
  }
};

const findUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err: any) {
    throw new Error(`Error finding user: ${err.message}`);
  }
};

export const UserService = {
  createUserIntoDB,
  findUserByEmail,
};
