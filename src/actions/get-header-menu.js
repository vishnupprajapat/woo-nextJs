import GET_HEADER_MENU   from "@/queries/get-header-menus";
import client from "@/components/client/ApolloClient";

export async function getHeaderMenu() {
    const { data } = await client.query({
        query: GET_HEADER_MENU
    });

    return data.menuItems.edges;
}
