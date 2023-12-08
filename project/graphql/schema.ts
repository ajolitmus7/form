export const typeDefs = `#graphql 
  type Query{
   users :[arrayname]
  }
  type User {
    user: [user]
    users(_id: ID!): user
  }
  type user {
    id: ID
    firstname: String
    email: String
    password: String
  }
 type arrayname{
  firstname:String
}
type signIntoken{
  token :String
}
 type Mutation {
  signupUser(id:ID,firstname:String,email:String,password:String): user
  signinUser(email:String,password:String): signIntoken
  updateUser(firstname:String,password:String): String
  }
`;
