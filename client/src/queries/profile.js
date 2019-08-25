import gql from "graphql-tag";

export const GET_PROFILE = gql`
  query Profile($id: ID!) {
    profile(id: $id) {
      id
      firstName
      lastName
      birthDate
      prefersColorScheme
      avatar {
        id
        mime
        url
      }
      created_at
      updated_at
    }
  }
`;

export const GET_PROFILES = gql`
  query {
    profiles {
      id
      firstName
      lastName
      birthDate
      prefersColorScheme
      avatar {
        id
        mime
        url
      }
      created_at
      updated_at
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation Profile(
    $id: ID!
    $firstName: String
    $lastName: String
    $prefersColorScheme: String
    $birthDate: DateTime
  ) {
    updateProfile(
      input: {
        where: { id: $id }
        data: {
          firstName: $firstName
          lastName: $lastName
          prefersColorScheme: $prefersColorScheme
          birthDate: $birthDate
        }
      }
    ) {
      profile {
        id
        firstName
        lastName
        prefersColorScheme
        birthDate
        updated_at
      }
    }
  }
`;
