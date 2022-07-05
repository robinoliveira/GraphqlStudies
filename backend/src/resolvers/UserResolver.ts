import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "./models/User";
import { v4 } from "uuid";

@Resolver()
export class UserResolver {
  private data: User[] = [];

  @Query(() => [User])
  async users() {
    return this.data;
  }

  @Mutation(() => User)
  async createUser(@Arg("name") name: string) {
    const user = {
      id: v4(),
      name,
    };
    this.data.push(user);
    return user;
  }
}

/*When we want to return a list of information we put a [] in class line [User]  */
/*Query is to pick data*/
/*mutation is to alter data*/
