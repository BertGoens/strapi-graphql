import React from "react";
import { Query } from "react-apollo";
import { GET_PROFILES } from "../queries/profile";

export const PeopleList = ({ setFilter, setProfile }) => (
  <Query query={GET_PROFILES}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) console.error(error);
      if (error)
        return (
          <>
            <p>Error :(</p>
            <p>{error.message}</p>
          </>
        );

      return (
        <div>
          <h1>People</h1>
          {data.profiles.map(({ id, firstName, lastName }, idx, arr) => (
            <div key={id} style={{ marginBottom: "1em" }}>
              <p
                onClick={_ => {
                  setFilter(id);
                  setProfile(arr[idx]);
                }}
              >
                Name: {firstName} {lastName}
              </p>
            </div>
          ))}
        </div>
      );
    }}
  </Query>
);
