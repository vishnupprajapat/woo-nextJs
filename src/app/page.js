

import { getProductAndCat } from "@/actions/get-product-and-cat";
import HeroCarousel from "@/components/client/hero-carousel";
import Product from "@/components/server/Product";
import ParentCategoriesBlock from "@/components/server/category/category-block/ParentCategoriesBlock";

export default async function Home () {
  const {product:{heroCarousel,productCategories,products}}= await getProductAndCat()


	return (
			<>
				{/*Hero Carousel*/}
				<HeroCarousel heroCarousel={heroCarousel}/>
				{/*Categories*/ }
				<div className="product-categories-container container mx-auto my-32 px-4 xl:px-0">
					<h2 className="main-title text-xl mb-5 uppercase"><span className="main-title-inner">Categories</span></h2>
					<ParentCategoriesBlock productCategories={ productCategories }/>
				</div>
				{/*Products*/ }
				<div className="products container mx-auto my-32 px-4 xl:px-0">
					<h2 className="products-main-title main-title mb-5 text-xl uppercase"><span className="main-title-inner">Products</span></h2>
					<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
						{ products.length ? (
							products.map( product => <Product key={ product.id } product={ product }/> )
						) : '' }
					</div>
				</div>

			</>
	)
};

// export async function getStaticProps () {

// 	const { data } = await client.query( {
// 		query: PRODUCTS_AND_CATEGORIES_QUERY,
// 	} );

// 	return {
// 		props: {
// 			productCategories: data?.productCategories?.nodes ? data.productCategories.nodes : [],
// 			products: data?.products?.nodes ? data.products.nodes : [],
// 			heroCarousel: data?.heroCarousel?.nodes[0]?.children?.nodes ? data.heroCarousel.nodes[0].children.nodes : []
// 		},
// 		revalidate: 1
// 	}

// };
