import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { GET_USER_QUERY } from "../App";
import { client } from "../lib/apollo";

const CREATE_USER_MUTATION = gql`
  mutation ($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

export const NewUserForm = () => {
  const [name, setName] = useState<string>();
  const [createUser, { data, loading, error }] =
    useMutation(CREATE_USER_MUTATION);
  const handleCreateUser = async (event: FormEvent) => {
    event.preventDefault();
    if (!name) {
      return;
    }
    await createUser({
      variables: {
        name,
      },

      //   refetchQueries: [GET_USER_QUERY],-> make a fetch after the mutation
      update: (cache, { data: { createUser } }) => {
        const { users } = client.readQuery({ query: GET_USER_QUERY });

        cache.writeQuery({
          query: GET_USER_QUERY,
          data: {
            users: [...users, createUser],
          },
        });
      },
    });
  };
  return (
    <form onSubmit={handleCreateUser}>
      <input
        type="text"
        placeholder="Insira o nome"
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
};

//refetchQueries: [GET_USER_QUERY],-> when the mutation is finished
//it does a refresh of the given a query
