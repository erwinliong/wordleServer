import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Query {
        // books(limit: Int): [Book]
        // book(id: ID!): Book
        allWords: [String]
        wordOfTheDay(index: Int!): String
    }
    // type Mutation {
    //     addBook(title: String!, author: String!, description: String!): BookResponse
    //     updateBook(id: ID!, title: String, author: String, description: String): BookResponse
    //     deleteBook(id: ID!): BookResponse
    // }
    // type Book {
    //     _id: ID!
    //     title: String!
    //     author: String!
    //     description: String!
    // }
    // type Books {
    //     books: [Book]
    // }
    // type BookResponse {
    //     data: Book
    //     error: String
    //     ok: Boolean
    // }
`);

export default schema;