const resolvers = {
  Query: {
    testField: (parent, args, context, info) => "TestField Works"
  }
};

export default resolvers;
