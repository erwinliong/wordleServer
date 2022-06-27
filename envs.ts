import { config } from 'dotenv'

config();

export default {
    port: process.env.PORT || 3000,
    graphqlPath: process.env.GRAPHQL_PATH || '/graphql',
    dbUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/graphql-starter',
}
