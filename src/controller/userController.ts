import { Request, Response, NextFunction } from "express";
import usersModel from "../models/user";

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
    next(error);
  }
};
