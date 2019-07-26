import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { UPDATE_PERSON_PROFILE } from "../queries/people";

export function PeopleEditor(person, onSubmit) {
  const [firstNameField, setFirstNameField] = useState(person.firstName);
  const [lastNameField, setLastNameField] = useState(person.lastName);

  return (
    <div>
      <h1>People Editor</h1>
      <Mutation mutation={UPDATE_PERSON_PROFILE}>
        {(updatePerson, { data }) => (
          <form>
            <input type="number" hidden name="id" value={person.id} />
            First name:
            <input
              type="text"
              name="firstName"
              defaultValue={person.firstName}
              onChange={e => setFirstNameField(e.target.value)}
            />
            <br />
            <br />
            Last name:
            <input
              type="text"
              name="lastName"
              defaultValue={person.lastName}
              onChange={e => {
                setLastNameField(e.target.value);
              }}
            />
            <br />
            <br />
            <input
              type="submit"
              value="Submit"
              onSubmit={e => {
                e.preventDefault();
                updatePerson({
                  variables: {
                    id: person.id,
                    firstName: firstNameField,
                    lastName: lastNameField
                  }
                });
              }}
            />
          </form>
        )}
      </Mutation>
    </div>
  );
}
