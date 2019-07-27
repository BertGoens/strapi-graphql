import React, { useEffect, useState } from "react";
import { Mutation } from "react-apollo";
import { UPDATE_PROFILE } from "../queries/profile";

export function PeopleEditor({ profile }) {
  const [firstNameField, setFirstNameField] = useState("");
  const [lastNameField, setLastNameField] = useState("");

  useEffect(() => {
    const { firstName, lastName } = profile;
    setFirstNameField(firstName);
    setLastNameField(lastName);
  }, [profile]);

  const _onSubmit = async e => {
    e.preventDefault();

    // the FormData parameters are defined by Strapi
    var formData = new FormData();

    formData.append("ref", "profile"); // Model name
    formData.append("refId", profile.id); // Profile id
    formData.append("field", "avatar"); // Field name in the model

    // HTML image file input, chosen by user
    const file = document.getElementById("fileItem").files[0];
    if (!file) {
      console.warn("No file selected");
      return;
    }
    formData.append("files", file);

    const url = `${process.env.REACT_APP_STRAPI}/upload`;
    const requestInit = {
      method: "post",
      headers: {
        authorization: process.env.REACT_APP_JWT
      },
      body: formData
    };

    const response = await fetch(url, requestInit);
    console.log("ok: " + response.ok);
    console.log(response.status + " " + response.statusText);
  };

  return (
    <div>
      <h1>People Editor</h1>
      <div>
        <h2>Avatar</h2>
        <form onSubmit={_onSubmit} id="updateAvatarForm">
          <input
            type="file"
            name="files"
            accept="image/*"
            readOnly
            id="fileItem"
          />
          <br />
          <br />
          <button type="submit">Send</button>
          <br />
          <br />
        </form>
      </div>

      <Mutation mutation={UPDATE_PROFILE} key={profile.id}>
        {(updatePerson, { data }) => (
          <div>
            <h2>Fields</h2>
            First name:
            <input
              type="text"
              name="firstName"
              value={firstNameField || ""}
              onChange={e => setFirstNameField(e.target.value)}
            />
            <br />
            <br />
            Last name:
            <input
              type="text"
              name="lastName"
              value={lastNameField || ""}
              onChange={e => {
                setLastNameField(e.target.value);
              }}
            />
            <br />
            <br />
            <button
              onClick={() => {
                try {
                  updatePerson({
                    variables: {
                      id: profile.id,
                      firstName: firstNameField,
                      lastName: lastNameField
                    }
                  });
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              Submit
            </button>
          </div>
        )}
      </Mutation>
    </div>
  );
}
