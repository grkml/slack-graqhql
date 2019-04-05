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
    const newTeam = new Team({
      ...args,
      ownerId: context.user.id
    });
    let success = true;
    await newTeam.save().catch(err => {
      console.log(err);
      success = false;
    });
    return success;
  },

  createChannel: async(parent, args, context, info) => {
    const { Channel } = context.mongooseModels;
    const newChannel = new Channel(args);
    let success = true;
    await newChannel.save().catch(err => {
      console.log(err);
      success = false;
    });
    return success;
  },

  createMessage: async(parent, args, context, info) => {
    const { Message } = context.mongooseModels;
    const newMessage = new Message({
      ...args,
      userId: context.user.id
    });
    let success = true;
    await newMessage.save().catch(err => {
      console.log(err);
      success = false;
    });
    return success;
  }

};

export default mutationResolver;
