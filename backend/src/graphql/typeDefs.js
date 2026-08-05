const typeDefs = `#graphql
  type Todo {
    _id: ID!
    userId: Int
    id: Int
    title: String!
    completed: Boolean!
  }

  type Query {
    getTodos: [Todo]
  }

  type Mutation {
    addTodo(title: String!, userId: Int, id: Int): Todo!
    updateTodo(_id: ID!, title: String, completed: Boolean): Todo!
    deleteTodo(_id: ID!): Todo!
  }
`;
export default typeDefs;
