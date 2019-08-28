import React from "react";
import { GET_PROFILE } from "../queries/profile";

function isValidAvatar(file) {
  if (!file) {
    console.warn("No file selected");
    return false;
  }

  if (file.type && !file.type.startsWith("image/")) {
    console.warn("File is not an image");
    return false;
  }

  const megabyte = 1000000;
  if (file.size > megabyte) {
    console.warn("File exceeds 1MB, please choose a smaller file.");
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

function updateApolloCache(uploadDetails, client, profileId) {
  // take new avatar properties from the response
  const { mime, url, id } = uploadDetails;

  // retrieve old profile avatar
  const { profile } = client.readQuery({
    query: GET_PROFILE,
    variables: { id: profileId }
  });

  // overwrite old profile avatar
  if (!profile.avatar) {
    profile.avatar = { __typename: "UploadFile" };
  }
  Object.assign(profile.avatar, { mime, url, id });
  client.writeQuery({
    query: GET_PROFILE,
    variables: { id: profileId },
    data: { profile }
  });
}

function deleteAvatar(id) {
  const url = `${process.env.REACT_APP_STRAPI}/upload/files/${id}`;
  const requestInit = {
    method: "delete",
    headers: {
      authorization: process.env.REACT_APP_JWT
    }
  };

  return fetch(url, requestInit);
}

const _updateAvatar = (
  client, // the apollo client
  profile,
  setAvatarHash
) => async e => {
  const file = document.getElementById("fileItem").files[0];
  if (!isValidAvatar(file)) return;

  const formData = buildFormData(file, profile.id);

  // upload the avatar
  const response = await makeUpdateAvatarRequest(formData);
  // const response: MediaPost[] = await makeUpdateAvatarRequest(formData);

  // update apollo cache
  if (response.ok) {
    const upload = await response.json();
    const uploadDetails = upload[0];
    const { hash } = uploadDetails;

    // remove old profile
    if (profile.avatar && profile.avatar.id) {
      const deleteOk = await deleteAvatar(profile.avatar.id);
      if (!deleteOk.ok) {
        console.warn("Could not remove old avatar");
      }
    }

    // update reference to new profile
    await updateApolloCache(uploadDetails, client, profile.id);

    // have react rerender any profile image component
    setAvatarHash(hash);
  }
};

export function PersonAvatarEditor({ id, profile, client, setAvatarHash }) {
  return (
    <div style={{ marginBottom: "1em" }}>
      <h1>Selected Editor</h1>
      <div>
        <h2>Avatar</h2>
        <div>
          {profile && profile.avatar && (
            <img
              alt=""
              src={`${process.env.REACT_APP_STRAPI}/${profile.avatar.url}`}
              style={{
                height: "64px",
                width: "64px",
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
            onChange={_updateAvatar(client, profile, setAvatarHash)}
            style={{
              opacity: 1, // change this into 0 with a webapp
              display: 'inherit' // change this into none with a webapp
            }}
          />
        </div>
      </div>
    </div>
  );
}
