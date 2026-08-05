import Todo from '../models/ToDo.model.js'; // Adjust the relative path to your schema file

const resolvers = {
  Query: {
    getTodos: async () => {
      return await Todo.find().sort({ createdAt: -1 });
    },
  },
  Mutation: {
    addTodo: async (_, { title, userId, id }) => {
      const newTodo = new Todo({ title, userId, id });
      return await newTodo.save();
    },

    updateTodo: async (_, { _id, title, completed }) => {
      const updateFields = {};
      if (title !== undefined) updateFields.title = title;
      if (completed !== undefined) updateFields.completed = completed;

      const updatedTodo = await Todo.findByIdAndUpdate(
        _id,
        { $set: updateFields },
        { new: true, runValidators: true }
      );
      if (!updatedTodo) throw new Error('Todo item not found');
      return updatedTodo;
    },

    deleteTodo: async (_, { _id }) => {
      const deletedTodo = await Todo.findByIdAndDelete(_id);
      if (!deletedTodo) throw new Error('Todo item not found');
      return deletedTodo;
    },
  },
};
export default resolvers;
