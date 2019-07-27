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

  return (
    <div>
      <h1>People Editor</h1>
      <div>
        <h2>Avatar</h2>
        <form
          id="updateAvatar"
          method="post"
          action="http://localhost:1337/upload"
        >
          <input type="file" name="files" accept="image/*" readOnly />

          {/* Model name */}
          <input type="text" name="ref" value="profile" readOnly hidden />

          {/* Profile id */}
          <input type="text" name="refId" value={profile.id} hidden />

          {/* Field name in the model */}
          <input type="text" name="field" value="avatar" readOnly hidden />
          <br />
          <br />

          {/* POST must be of type FormData */}
          <input
            type="submit"
            value="Submit"
            onSubmit={e => {
              e.preventDefault();
              e.stopPropagation();

              const formElement = document.getElementById("updateAvatar");
              const request = new XMLHttpRequest();
              // TODO
              request.setRequestHeader("authorization", "Bearer ey");
              request.open("POST", "http://localhost:1337/upload");
              request.send(new FormData(formElement));
              console.log("Request sent");
            }}
          />
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
