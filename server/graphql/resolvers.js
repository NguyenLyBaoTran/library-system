const jwt = require("jsonwebtoken");
const Book = require("../models/Book");

const resolvers = {
  Query: {
    getAllBooks: async (_, __, context) => {
      if (!context.isAuth) {
        throw new Error("Unauthorized: Please login to access this data");
      }
      return await Book.findAll();
    },
  },
  Mutation: {
    login: async (_, { username, password }) => {
      // Mock authentication
      if (username === "admin" && password === "password123") {
        return jwt.sign(
          { id: 1, role: "admin" },
          process.env.JWT_SECRET || "secret",
          { expiresIn: "1h" }
        );
      }
      throw new Error("Invalid username or password");
    },
    addBook: async (_, args, context) => {
      if (!context.isAuth) {
        throw new Error("Forbidden: You do not have permission");
      }
      
      // Basic Validation
      if (!args.title || args.title.trim() === "") {
        throw new Error("Validation Error: Title is required");
      }

      return await Book.create(args);
    },
  },
};

module.exports = resolvers;