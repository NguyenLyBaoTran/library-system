const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    category: String
    year: Int
  }

  type AuthPayload {
    token: String!
  }

  type Query {
    getAllBooks: [Book]
  }

  type Mutation {
    login(username: String!, password: String!): String
    addBook(title: String!, author: String!, category: String, year: Int): Book
  }
`;

module.exports = typeDefs;