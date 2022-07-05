import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field((_type) => ID)
  id: string;

  @Field()
  name: string;
}

/*(_type) => ID-> used to say that, that field is an unique id*/
