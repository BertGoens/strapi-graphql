import React, { useState, useEffect } from "react";
import { Mutation } from "react-apollo";
import { UPDATE_PERSON_PROFILE } from "../queries/people";

export function PeopleEditor({ person, onSubmit }) {
  const [firstNameField, setFirstNameField] = useState("");
  const [lastNameField, setLastNameField] = useState("");

  useEffect(() => {
    const { firstName, lastName } = person;
    setFirstNameField(firstName);
    setLastNameField(lastName);
  }, [person]);

  return (
    <div>
      <h1>People Editor</h1>
      <Mutation mutation={UPDATE_PERSON_PROFILE} key={person.id}>
        {(updatePerson, { data }) => (
          <div>
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
                      id: person.id,
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
