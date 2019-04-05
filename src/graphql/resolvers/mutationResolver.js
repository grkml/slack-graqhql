const mutationResolver = {
  createUser: async(parent, args, context, info) => {
    const { User } = context.mongooseModels;
    const newUser = new User(args);
    const { id, username, email } = await newUser.save().catch(err => {
      console.log(err);
      throw err;
    });
    return { id, username, email };
  },
  createTeam: async(parent, args, context, info) => {
    const { Team } = context.mongooseModels;
    const ownerId = context.user.id;
    const newTeam = new Team({
      ...args,
      ownerId
    });
    const { name } = await newTeam.save().catch(err => {
      console.log(err);
      throw err;
    });
    return name ? true : false;
  }
};

export default mutationResolver;
