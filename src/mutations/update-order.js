import { gql } from "@apollo/client";

const UPDATE_ORDER = gql`
  mutation UPDATE_ORDER($input: UpdateOrderInput!) {
    updateOrder(input: $input) {
      order {
        id
        status
        transactionId
      }
    }
  }
`;


export default UPDATE_ORDER;
