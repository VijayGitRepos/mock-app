import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

dns.setServers(['1.1.1.1', '8.8.8.8']);

import typeDefs from './src/graphql/typeDefs.js';
import resolvers from './src/graphql/resolvers.js';
import connectDB from './src/config/db.js';

async function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json()); 
  app.use(express.urlencoded({ extended: true }));
  
  const server = new ApolloServer({ 
    typeDefs,
    resolvers
  });
  
  await server.start();

  const PORT = process.env.PORT || 5000;
//   const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/graphql_todo';

//   await mongoose.connect(MONGO_URI);
//   console.log('🚀 Connected to MongoDB successfully.');

connectDB();

  app.use('/graphql', 
    (req, res, next) => {
      if (!req.body) req.body = {}; 
      next();
    },
    expressMiddleware(server)
  );

  app.listen(PORT, () => {
    console.log(`Server executing at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch(err => console.error(err));
