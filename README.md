# Strapi GraphQL example

An introduction of GraphQL with minimal Strapi configuration.

A content type `Profile` has been added with the following field types:

- String: first, last name
- DateTime: date of birth
- Media: avatar

GraphQL queries have been set up for retrieving All the profiles, filtering a select profile based on Id and partially updating a profile.
Furthermore a FormData fetch enables us to change the avatar for the selected user by uploading the selected file.

## Development

Open 2 terminals with the following tasks:

### Backend

```sh
# Navigate to the correct folder
cd ./server
# Download the dependencies
yarn
# Start the server
strapi dev
```

### Frontend

```sh
# Navigate to the correct folder
cd ./client
# Download the dependencies
yarn
# Start the frontend
yarn start
```
