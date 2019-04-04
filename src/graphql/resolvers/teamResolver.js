export default {
  Mutation: {
    createTeam: async(parent, args, context, info) => {
      const { Team } = context.mongooseModels;
      const newTeam = new Team(args);
      const { name } = await newTeam.save().catch(err => {
        console.log(err);
        throw err;
      });
      return name ? true : false;
    }
  }
};
