import ApolloClient from "apollo-boost";
import React, { useState } from "react";
import { ApolloProvider } from "react-apollo";
import { PeopleEditor } from "./components/PeopleEditor";
import { PeopleFilter } from "./components/PeopleFilter";
import { PeopleList } from "./components/PeopleList";

const token =
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTY0MTYxMjA0LCJleHAiOjE1NjY3NTMyMDR9.sZJGXU1w30hpKgVA8ThSDJ8HLe8PckXdobRry6CSnWE"

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  request: operation => {
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  }
});

function App() {
  const [idFilter, setIdFilter] = useState(1);
  const [profile, setProfile] = useState({});

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <PeopleList setFilter={setIdFilter} setProfile={setProfile} />
        <PeopleFilter id={idFilter} setFilter={setIdFilter} />
        <PeopleEditor profile={profile} />
      </div>
    </ApolloProvider>
  );
}

export default App;
