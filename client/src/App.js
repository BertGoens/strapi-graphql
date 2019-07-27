import ApolloClient from "apollo-boost";
import React, { useState } from "react";
import { ApolloProvider } from "react-apollo";
import { PeopleDetails } from "./components/PeopleDetails";
import { PeopleEditor } from "./components/PeopleEditor";
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
  const [idFilter, setIdFilter] = useState(1);
  const [profile, setProfile] = useState({});

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <PeopleList setFilter={setIdFilter} setProfile={setProfile} />
        <PeopleDetails id={idFilter} setFilter={setIdFilter} />
        <PeopleEditor profile={profile} />
      </div>
    </ApolloProvider>
  );
}

export default App;
