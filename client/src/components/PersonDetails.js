import React from "react";
import { Query } from "react-apollo";
import { GET_PROFILE } from "../queries/profile";

export const PersonDetails = ({ id }) => (
  <>
    <h1>Selected Details</h1>

    <Query query={GET_PROFILE} variables={{ id }}>
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
              <b>Id: </b> {data.profile && data.profile.id}
            </li>
            <li>First Name: {data.profile && data.profile.firstName}</li>
            <li>Last Name: {data.profile && data.profile.lastName}</li>
            <li>Birthdate: {data.profile && data.profile.birthDate}</li>
            <li>
              Avatar:
              {data.profile && data.profile.avatar && data.profile.avatar.url && (
                <ul>
                  <li>
                    <img
                      alt=""
                      src={`${process.env.REACT_APP_STRAPI}/${
                        data.profile.avatar.url
                      }`}
                      style={{
                        maxHeight: "64px",
                        maxWidth: "64px",
                        height: "auto",
                        width: "auto"
                      }}
                    />
                  </li>
                  <li>Avatar id: {data.profile.avatar.id}</li>
                  <li>Avatar mime: {data.profile.avatar.mime}</li>
                </ul>
              )}
            </li>
            <li>
              Color-Scheme: {data.profile && data.profile.prefersColorScheme}
            </li>
            <li>Created At:{data.profile && data.profile.created_at}</li>
            <li>Updated At: {data.profile && data.profile.updated_at}</li>
          </ul>
        );
      }}
    </Query>
  </>
);
