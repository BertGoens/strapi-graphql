import gql from "graphql-tag";

export const GET_PERSON = gql`
  query Person($id: ID!) {
    person(id: $id) {
      id
      firstName
      lastName
      birthDate
      avatar
      created_at
      updated_at
    }
  }
`;

export const GET_PEOPLE = gql`
  query {
    people {
      id
      firstName
      lastName
      birthDate
      avatar
      created_at
      updated_at
    }
  }
`;

export const UPDATE_PERSON_PROFILE = gql`
  mutation Person(
    $id: ID!
    $firstName: String
    $lastName: String
    $prefersColorScheme: String
    $birthDate: DateTime
  ) {
    updatePerson(
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
      person {
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
