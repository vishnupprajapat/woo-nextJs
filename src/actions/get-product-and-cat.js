import client from "@/components/client/ApolloClient";
import PRODUCTS_AND_CATEGORIES_QUERY from "@/queries/product-and-categories";

export async function getProductAndCat () {

	const { data } = await client.query( {
		query: PRODUCTS_AND_CATEGORIES_QUERY,
	}  );

	return {
		product: {
			productCategories: data?.productCategories?.nodes ? data.productCategories.nodes : [],
			products: data?.products?.nodes ? data.products.nodes : [],
			heroCarousel: data?.heroCarousel?.nodes[0]?.children?.nodes ? data.heroCarousel.nodes[0].children.nodes : []
		},
		revalidate: 1
	}

};
