export default {
  Query: {
    getUser: async(parent, args, context, info) => {
      const { User } = context.mongooseModels;
      return await User
        .findById(args.id, 'id username email')
        .catch(err => console.log(err));
    },
    allUsers: async(parent, args, context, info) => {
      const { User } = context.mongooseModels;
      return await User
        .find({}, 'id username email')
        .catch(err => console.log(err));
    }
  },
  Mutation: {
    createUser: async(parent, args, context, info) => {
      const { User } = context.mongooseModels;
      const newUser = new User(args);
      const { id, username, email } = await newUser
        .save()
        .catch(err => console.log(err));
      return { id, username, email };
    }
  }
};