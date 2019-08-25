import React from "react";
import { Query } from "react-apollo";
import { GET_PROFILE } from "../queries/profile";

function isValidAvatar(file) {
  if (!file) {
    console.warn("No file selected");
    return false;
  }

  if (file.type && !file.type.startsWith("image/")) {
    console.log("File is not an image");
    return false;
  }

  return true;
}

function buildFormData(file, id) {
  // the FormData parameters are defined by Strapi
  var formData = new FormData();
  formData.append("ref", "profile"); // Model name
  formData.append("refId", id); // Profile id
  formData.append("field", "avatar"); // Field name in the model
  formData.append("files", file); // HTML image file input, chosen by user

  return formData;
}

function makeUpdateAvatarRequest(formData) {
  const url = `${process.env.REACT_APP_STRAPI}/upload`;
  const requestInit = {
    method: "post",
    headers: {
      authorization: process.env.REACT_APP_JWT
    },
    body: formData
  };

  return fetch(url, requestInit);
}

function updateApolloCache(uploadDetails, client, id) {
  // take new avatar properties from the response
  const { mime, url } = uploadDetails;

  // retrieve old profile avatar
  const { profile } = client.readQuery({
    query: GET_PROFILE,
    variables: { id }
  });

  // overwrite old profile avatar
  Object.assign(profile.avatar, { mime, url });
  client.writeQuery({
    query: GET_PROFILE,
    variables: { id },
    data: { profile }
  });
}

const _updateAvatar = (
  client, // the apollo client
  profileId,
  setAvatarHash
) => async e => {
  const file = document.getElementById("fileItem").files[0];
  if (!isValidAvatar(file)) return;

  const formData = buildFormData(file, profileId);

  // upload the avatar
  const response = await makeUpdateAvatarRequest(formData);
  // const response: MediaPost[] = await makeUpdateAvatarRequest(formData);

  // update apollo cache
  if (response.ok) {
    const upload = await response.json();
    const uploadDetails = upload[0];
    const { hash } = uploadDetails;

    await updateApolloCache(uploadDetails, client, profileId);
    // have react rerender any profile image component
    setAvatarHash(hash);
  }
};

export function PersonAvatar({ id, setAvatarHash }) {
  return (
    <div style={{ marginBottom: "1em" }}>
      <h1>Selected Editor</h1>
      <div>
        <h2>Avatar</h2>
        <div>
          Avatar:
          {
            <Query query={GET_PROFILE} variables={{ id }}>
              {({ data, client }) => (
                <>
                  {data && data.profile && data.profile.avatar && (
                    <img
                      alt=""
                      src={`${process.env.REACT_APP_STRAPI}/${
                        data.profile.avatar.url
                      }`}
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
                  )}
                  <input
                    type="file"
                    name="files"
                    accept="image/*"
                    readOnly
                    id="fileItem"
                    onChange={_updateAvatar(client, id, setAvatarHash)}
                    style={{ opacity: 0 }}
                  />
                </>
              )}
            </Query>
          }
        </div>
      </div>
    </div>
  );
}
