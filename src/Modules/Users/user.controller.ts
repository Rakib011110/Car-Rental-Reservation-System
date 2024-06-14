import { Request, Response } from "express";
import { UserService } from "./user.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../app/config";
import { TUser } from "./users.interface";

export const signUp = async (req: Request, res: Response) => {
  const { name, email, role, password, phone, address } =
    req.body as Partial<TUser>;

  try {
    const newUser = await UserService.createUserIntoDB({
      name,
      email,
      role,
      password,
      phone,
      address,
    });
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Error registering user",
      error: error.message,
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body as Partial<TUser>;

  try {
    const user = await UserService.findUserByEmail(email as string);
    if (!user || !(await bcrypt.compare(password as string, user.password))) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwt_access_secret as string,
      { expiresIn: "1d" }
    );

    if (user.role === "admin") {
      // Additional logic for admin login can be added here
      console.log("Admin has logged in");
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      data: user,
      token,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Error logging in",
      error: error.message,
    });
  }
};

export const UserController = {
  signUp,
  signIn,
};
