export default {
  Query: {

    getUser: async(parent, args, context, info) => {
      let response;
      const { User } = context.mongooseModels;
      await User
        .findById(args.id, 'id username email')
        .then((err, user) => {
          if (err) {
            console.log(err);
            throw new Error("Mongoose findOne() error during getUser Query");
          }
          else {
            response = {
              id: user.id,
              username: user.username,
              email: user.email
            };
          }
        });
      return response;
    },

    allUsers: async(parent, args, context, info) => {
      let response;
      const { User } = context.mongooseModels;
      await User
        .find({}, 'id username email')
        .then((err, users) => {
          if (err) {
            console.log(err);
            throw new Error("Mongoose find() error during allUsers Query");
          }
          else {
            response = users;
          }
        });
      return response;
    }

  },

  Mutation: {
    createUser: async(parent, args, context, info) => {
      const { User } = context.mongooseModels;
      const newUser = new User(args);
      const { id, username, email } = await newUser.save().then((err, user) => {
        if (err) {
          console.log(err);
          throw new Error("Mongoose save() error during createUser Mutation");
        }
      });
      return { id, username, email };
    }
  }
};
