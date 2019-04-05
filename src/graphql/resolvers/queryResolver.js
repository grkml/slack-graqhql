const queryResolver = {
  getUser: async(parent, args, context, info) => {
    const { User } = context.mongooseModels;
    return await User.findById(args.id, "id username email").catch(err => {
      console.log(err);
      throw err;
    });
  },
  allUsers: async(parent, args, context, info) => {
    const { User } = context.mongooseModels;
    return await User.find({}, "id username email").catch(err => {
      console.log(err);
      throw err;
    });
  }
};

export default queryResolver;
