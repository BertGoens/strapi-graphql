import React, { useEffect, useState } from "react";
import { Mutation } from "react-apollo";
import { UPDATE_PROFILE } from "../queries/profile";

export function PeopleEditor({ profile }) {
  const [firstNameField, setFirstNameField] = useState("");
  const [lastNameField, setLastNameField] = useState("");

  const { firstName, lastName, avatar, id } = profile;
  useEffect(() => {
    setFirstNameField(firstName);
    setLastNameField(lastName);
  }, [firstName, lastName, profile]);

  const _updateAvatar = async e => {
    const file = document.getElementById("fileItem").files[0];
    if (!file) {
      console.warn("No file selected");
      return;
    }

    if (file.type && !file.type.startsWith("image/")) {
      console.log("File is not an image");
      return;
    }

    // the FormData parameters are defined by Strapi
    var formData = new FormData();
    formData.append("ref", "profile"); // Model name
    formData.append("refId", profile.id); // Profile id
    formData.append("field", "avatar"); // Field name in the model
    formData.append("files", file); // HTML image file input, chosen by user

    const url = `${process.env.REACT_APP_STRAPI}/upload`;
    const requestInit = {
      method: "post",
      headers: {
        authorization: process.env.REACT_APP_JWT
      },
      body: formData
    };

    const response = await fetch(url, requestInit);
    if (response.ok) {
      const parsed = await response.json();
      const uploadDetails = parsed[0];
      const { mime, url } = uploadDetails;
      // update cache with personId = id
      console.log("Update apollo cache " + id);
    }
  };

  return (
    <div style={{ marginBottom: "1em" }}>
      <h1>Selected Editor</h1>
      <div>
        <h2>Avatar</h2>
        <div>
          Avatar:
          {avatar && avatar.url && (
            <>
              <img
                alt=""
                src={`${process.env.REACT_APP_STRAPI}/${avatar.url}`}
                style={{
                  maxHeight: "64px",
                  maxWidth: "64px",
                  height: "auto",
                  width: "auto",
                  cursor: "pointer"
                }}
                onClick={e => {
                  e.preventDefault();
                  document.getElementById("fileItem").click();
                }}
              />
              <input
                type="file"
                name="files"
                accept="image/*"
                readOnly
                id="fileItem"
                onChange={_updateAvatar}
                style={{ opacity: 0 }}
              />
            </>
          )}
        </div>
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
