const graphql = require("graphql");
const users = require("./data");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
} = graphql;

const UserType = new GraphQLObjectType({
    name : "User",
    fields : () =>({
        id : {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        users:{
            type: new GraphQLList(UserType),
            resolve(){
                return users
            }
        },

        user:{
            type:UserType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parent, args){
                return users.find(
                    user => user.id === args.id
                )
            }
        }

    }
})

const Mutation = new GraphQLObjectType({
    name : "Mutation",
    fileds: {
        addUser: {
            type: UserType,
            args:{
                id:{type: GraphQLString},
                name: {type: GraphQLString},
                age:{type: GraphQLInt}
            },
            resolve(parent,args){
                const user = {
                    id:args.id,
                    name: args.name,
                    age: args.age
                };
                users.push(user);

                return user;
            }
        }
    }

})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});