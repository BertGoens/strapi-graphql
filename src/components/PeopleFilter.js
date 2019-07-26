import React from "react";
import { Query } from "react-apollo";
import { GET_PERSON } from "../queries/people";

export const PeopleFilter = ({ id }) => (
  <>
    <h1>People Filter</h1>

    <Query query={GET_PERSON} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) console.error(error);
        if (error)
          return (
            <>
              <p>Error loading id:{id} :(</p>
              <p>{error.message}</p>
            </>
          );

        return (
          <ul>
            <li>
              <b>Id: </b> {data.person && data.person.id}
            </li>
            <li>First Name: {data.person && data.person.firstName}</li>
            <li>Last Name: {data.person && data.person.lastName}</li>
            <li>Birthdate: {data.person && data.person.birthDate}</li>
            <li>Avatar: {data.person && data.person.avatar}</li>
            <li>
              Color-Scheme: {data.person && data.person.prefersColorScheme}
            </li>
            <li>Created At:{data.person && data.person.created_at}</li>
            <li>Updated At: {data.person && data.person.updated_at}</li>
          </ul>
        );
      }}
    </Query>
  </>
);
