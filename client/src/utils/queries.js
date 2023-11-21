import { gql } from "@apollo/client";

export const QUERY_ME = gql `
    query singleUser ($id : ID!) {
     user(id: $id ) {
        _id
        username
        email
        todos {
            _id
            text
             completed
             date
        }
        categories{
            _id
            name
            
        }
    }
}
`;