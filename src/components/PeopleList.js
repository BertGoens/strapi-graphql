import React from "react";
import { Query } from "react-apollo";
import { GET_PEOPLE } from "../queries/people";

export const PeopleList = ({ setFilter, setProfile }) => (
  <Query query={GET_PEOPLE}>
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
          {data.people.map(({ id, firstName, lastName }, idx, arr) => (
            <div key={id} style={{ marginBottom: "1em" }}>
              <a
                href={"#" + id}
                onClick={_ => {
                  setFilter(id);
                  setProfile(arr[idx]);
                }}
              >
                Name: {firstName} {lastName}
              </a>
            </div>
          ))}
        </div>
      );
    }}
  </Query>
);
