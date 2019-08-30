const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');

const GraphQLDate = require('./graphql_date.js');
const postsService = require('../posts/postsService');
const commentsService = require('../posts/commentsService');
const auth = require('../auth.js');

const resolvers = {
  Query: {
    postList: postsService.latestPosts,
    post: postsService.findById,
  },
  Mutation: {
    addComment: commentsService.addComment,
  },
  GraphQLDate,
};

function getContext({ req }) {
  const user = auth.getUser(req);
  return { user };
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.resolve(__dirname, './schema.graphql'), 'utf-8'),
  resolvers,
  context: getContext,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

const initServer = (app) => {
  console.log('startApolloServer');
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting:', enableCors);
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
};

module.exports = { initServer };
