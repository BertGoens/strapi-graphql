import ApolloClient from "apollo-boost";
import React, { useState } from "react";
import { ApolloProvider } from "react-apollo";
import { PeopleList } from "./components/PeopleList";
import { PersonDetails } from "./components/PersonDetails";
import { PersonEditor } from "./components/PersonEditor";

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
        {idFilter > -1 && <PersonDetails id={idFilter} setFilter={setIdFilter} />}
        <PersonEditor id={idFilter} setAvatarHash={setAvatarHash} />
      </div>
    </ApolloProvider>
  );
}

export default App;
