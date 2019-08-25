import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { Mutation } from "react-apollo";
import { UPDATE_PROFILE } from "../queries/profile";

export function PersonFieldsEditor({ id, profile }) {
  const [values, setValues] = React.useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Mutation mutation={UPDATE_PROFILE} key={id}>
      {updatePerson => (
        <>
          <h2>Fields</h2>
          <form noValidate autoComplete="off">
            <TextField
              label="First Name"
              value={values.firstName}
              onChange={handleChange("firstName")}
            />

            <TextField
              label="Last Name"
              value={values.lastName}
              onChange={handleChange("lastName")}
            />

            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault()
                const { firstName, lastName } = values;
                try {
                  updatePerson({
                    variables: {
                      id,
                      firstName,
                      lastName
                    }
                  });
                } catch (error) {
                  console.error(error);
                }
              }}
            >Submit</Button>
          </form>
        </>
      )}
    </Mutation>
  );
}
