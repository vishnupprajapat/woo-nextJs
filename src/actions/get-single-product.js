
import { PRODUCT_BY_SLUG_QUERY, PRODUCT_SLUGS } from '@/queries/product-by-slug';
import client from '@/components/client/ApolloClient';
export async function getSingleProduct({slug}) {
    const {data} = await client.query({
        query: PRODUCT_BY_SLUG_QUERY,
        variables: { slug }
    })

    const product = data?.product || {}

    return product
}