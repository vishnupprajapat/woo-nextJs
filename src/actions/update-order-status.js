import client from "@/components/client/ApolloClient";
import UPDATE_ORDER from "@/mutations/update-order";

export async function updateOrder(orderId, status,transactionId="") {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_ORDER,
      variables: {
        input: {
          orderId:parseInt(orderId, 10),
          status:status.toUpperCase(),
          transactionId
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Error updating order:", error);
    return null;
  }
}
