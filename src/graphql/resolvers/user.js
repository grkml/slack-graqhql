export default {
  Query: {
    getUser: (parent, args, context, info) => {
      return {
        id: 'asdf1sdf',
        username: 'testusername2',
        email: 'email2@test.com',
      }
    },
    allUsers: (parent, args, context, info) => {
      return [{
          id: 'asdf151sd',
          username: 'testusername1',
          email: 'email1@test.com',
        },
        {
          id: 'asdf1sdf',
          username: 'testusername2',
          email: 'email2@test.com',
        },
      ]
    }
  },
  Mutation: {
    createUser: (parent, args, context, info) => {
      return {
        id: 'asdf151sd',
        username: 'testusername1',
        email: 'email1@test.com'
      }
    }
  }
};
