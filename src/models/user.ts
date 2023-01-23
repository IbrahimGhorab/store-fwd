import { User } from "../types";
import bcrypt from "bcrypt";
import db from "../database";
import config from "../config";

const hashPassWord = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  const hashedPassword = bcrypt.hashSync(password + config.pepper, salt);
  return hashedPassword;
};

class UserModel {
  async create(u: User): Promise<User> {
    try {
      //connect to database
      const connection = await db.connect();
      const sql = `INSERT INTO users (email,user_name,first_name,last_name,password) VALUES($1,$2,$3,$4,$5) returning *`;
      //run query
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPassWord(u.password),
      ]);
      //release connection
      connection.release();

      //return the result
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to create user: ${u.user_name}`);
    }
  }

  async getAll(): Promise<User[]> {
    try {
      // open connection to db
      const connection = await db.connect();
      const sql = `select * from users `;
      //run the query
      const result = await connection.query(sql);
      // release connection
      connection.release();
      //return the result
      return result.rows;
    } catch (error) {
      throw new Error(`unable to get all users`);
    }
  }

  async getOne(id: number): Promise<User> {
    try {
      // connect to the database
      const connection = await db.connect();

      // write sql query
      const sql = `select * from users where id = ($1)`;

      // Run the query
      const result = await connection.query(sql, [id]);

      // Release the connection to database
      connection.release();

      // return the result
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to get user with id ${id}`);
    }
  }

  async updateOne(u: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `update user set email=$1, user_name=$2 first_name=$3 ,last_name=$4,password=$5 where id=$6 returning id ,email,first_name,last_name`;
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPassWord(u.password),
        u.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to update user with`);
    }
  }

  async deleteOne(id: number): Promise<User> {
    try {
      // connect to database
      const connection = await db.connect();
      // write sql query
      const sql = `delete from users where id=($1) returning id,email,user_name,first_name,last_name`;
      //run the Query
      const result = await connection.query(sql, [id]);
      //release the connection
      connection.release();
      // return the result
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to delete user with id ${id}`);
    }
  }

  //authenticate users
  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const connection = await db.connect();
      const sql = `select password from users where email=$1`;
      const result = await connection.query(sql, [email]);
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0];
        // const hashPassword = result.rows[0];
        const isPasswordVaild = bcrypt.compareSync(
          password + config.pepper,
          hashPassword
        );
        if (isPasswordVaild) {
          const userInfo = await connection.query(
            `select * from users where email=$1`,
            [email]
          );
          return userInfo.rows[0];
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error(`unable to authenticate this user with email ${email}`);
    }
  }
}

export default UserModel;
