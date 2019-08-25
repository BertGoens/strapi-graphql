import React from "react";
import { Query } from "react-apollo";
import { GET_PROFILE } from "../queries/profile";
import { PersonAvatarEditor } from "./PersonAvatarEditor";
import { PersonFieldsEditor } from "./PersonFieldsEditor";

export function PersonEditor({ id, setAvatarHash }) {

  return (
    <Query query={GET_PROFILE} variables={{ id }}>
      {({ data, client }) => (
        <>
          {data && data.profile && (
            <>
              <PersonAvatarEditor
                id={id}
                setAvatarHash={setAvatarHash}
                client={client}
                profile={data.profile}
              />
              <PersonFieldsEditor id={id} profile={data.profile} />
            </>
          )}
        </>
      )}
    </Query>
  );
}
