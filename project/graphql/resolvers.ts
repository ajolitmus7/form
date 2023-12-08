const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
import { UserData } from "@/pages/api/graphql";
type user = {
  firstname: String;
  email: String;
  password: String;
};
const JWT_SECRET = process.env.JWT_SECRET;
export const resolvers = {
  Query: {
    users: async (_parent: any, args: any, User: UserData) => {
      return await User.prisma.user.findMany({});
    },
  },
  Mutation: {
    signupUser: async (_parent: any, args: any, User: UserData) => {
      const user = await User.prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });
      if (user) {
        throw new Error("User already exists with that email");
      }

      const hashedPassword = await bcrypt.hash(args.password, 12);
      return await User.prisma.user.create({
        data: {
          firstname: args.firstname,
          email: args.email,
          password: hashedPassword,
        },
      });
    },
    signinUser: async (_parent: any, args: any, User: UserData) => {
      const user = await User.prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });

      if (!user) {
        throw new Error("User doesnt exists with that email");
      }
      const doMatch = await bcrypt.compare(args.password, user.password);
      if (!doMatch) {
        throw new Error("email or password in invalid");
      }
      if (doMatch) {
        const token = await jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET
        );
        return { token };
      }
    },
    updateUser: async (_parent: any, args: any, User: UserData) => {
      return await User.prisma.user.update({
        where: {
          id: args.id,
        },
        data: {
          firstname: args.title,
          password: args.image,
        },
      });
    },
  },
};
