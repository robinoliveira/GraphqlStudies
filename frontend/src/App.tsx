import { gql, useQuery } from "@apollo/client";
import { NewUserForm } from "./components/NewUserForm";

type ApiResponse = {
  users: {
    name: string;
    id: string;
  }[];
};

export const GET_USER_QUERY = gql`
  query {
    users {
      name
      id
    }
  }
`;

function App() {
  const { data, loading } = useQuery<ApiResponse>(GET_USER_QUERY);

  console.log(data?.users);

  if (loading) {
    return <p>Carregando....</p>;
  }

  return (
    <div>
      <ul>
        {data?.users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <NewUserForm />
    </div>
  );
}

export default App;
