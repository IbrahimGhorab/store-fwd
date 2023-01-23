import { Request, Response, NextFunction } from "express";
import usersModel from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config";

const userModel = new usersModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(req.body);
    res.json({
      status: "success",
      data: { ...user },
      message: "user created successfully",
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await userModel.getAll();
    res.json({
      status: "success",
      data: { ...allUsers },
      message: "get all users successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.getOne(req.params.id as unknown as number);
    res.json({
      status: "success",
      data: { ...user },
      message: `get user successfully`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.updateOne(req.body);
    res.json({
      status: "success",
      data: { ...user },
      message: "user updated successfully",
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.deleteOne(req.params.id as unknown as number);
    res.json({
      status: "success",
      data: { ...user },
      message: "user deleted successfully",
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
export const authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.authenticate(email, password);
    const token = jwt.sign(
      // you can pass user as string like this (user as unknown as string)
      //or you can pass user as object like this
      { user },
      config.jwtSecret as string
    );
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: `user not authenticated`,
      });
    }
    return res.json({
      status: "success",
      data: { ...user, token },
      message: "user authenticated successfully",
    });
  } catch (error) {
    return next(error);
  }
};
