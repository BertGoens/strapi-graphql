import ApolloClient from "apollo-boost";
import React, { useState } from "react";
import { ApolloProvider } from "react-apollo";
import { PeopleDetails } from "./components/PeopleDetails";
import { PersonAvatar } from "./components/PeopleEditor";
import { PeopleList } from "./components/PeopleList";

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_STRAPI}/graphql`,
  request: operation => {
    operation.setContext({
      headers: {
        authorization: process.env.REACT_APP_JWT
      }
    });
  }
});

function App() {
  const [idFilter, setIdFilter] = useState(-1);
  const [, setAvatarHash] = useState("");

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <PeopleList selectedId={idFilter} setFilter={setIdFilter} />
        <PeopleDetails id={idFilter} setFilter={setIdFilter} />
        <PersonAvatar id={idFilter} setAvatarHash={setAvatarHash} />
      </div>
    </ApolloProvider>
  );
}

export default App;
