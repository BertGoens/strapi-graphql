import React, { useState } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { PeopleList } from "./components/PeopleList";
import { PeopleFilter } from "./components/PeopleFilter";
import { PeopleEditor } from "./components/PeopleEditor";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTY0MDU4NTIxLCJleHAiOjE1NjY2NTA1MjF9.8UZsh4xuOJslGOGEk45hXSgwHid8YZyD3CmzNxDSjf0";

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
        <PeopleEditor person={profile} />
      </div>
    </ApolloProvider>
  );
}

export default App;
