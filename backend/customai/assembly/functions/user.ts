import { graphql } from "@hypermode/modus-sdk-as";
import { User } from "../classes/classes";
import { JSON } from "json-as";

const connection: string = "dgraph";


@json
class CreateUserResponse {
  createUser: User | null = null;
}


@json
class UserResponse {
  queryUser: User | null = null;
}

export function createUser(clerkId: string): User | null {
  const user = getUser(clerkId);
  if (user!.clerkId === clerkId) {
    return user;
  }
  const statement = `
    mutation createUser( $clerkId: String!) {
        addUser(input: {clerkId: $clerkId}) {
        numUids
        }}
    
    `;

  const vars = new graphql.Variables();
  vars.set("clerkId", clerkId);

  const response = graphql.execute<CreateUserResponse>(
    connection,
    statement,
    vars,
  );

  return response.data!.createUser;
}

export function getUser(clerkId: string): User | null {
  console.log(clerkId);
  const statement = `
    query queryUser($clerkId: String!) {
    queryUser(filter: { clerkId: { eq: $clerkId } }) {
      id
      clerkId
      email
      projects {
        id
        name
      }
    }
  }
`;

  const vars = new graphql.Variables();
  vars.set("clerkId", clerkId);
  const varlog = vars.toJSON();
  console.log(varlog);

  const response = graphql.execute<UserResponse>(connection, statement, vars);

  const responselog = JSON.stringify(response);
  console.log(responselog);

  if (response.data!.queryUser!.clerkId === "") {
    console.log("No user found");
    return null;
  }
  const users = response.data!.queryUser;

  // if (!users) {
  //   console.log("No user found");
  //   return null;
  // }

  return users;
}
