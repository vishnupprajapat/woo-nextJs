import GET_COUNTRIES from "@/queries/get-countries";
import client from "@/components/client/ApolloClient";

export async function getCountries() {
    const { data } = await client.query({
        query: GET_COUNTRIES
    });

    return data
}
