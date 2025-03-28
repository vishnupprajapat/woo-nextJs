
import { isEmpty } from 'lodash';
import AddToCart from '@/components/client/cart/AddToCartButton';
import Price from '@/components/server/single-product/price';
import GalleryCarousel from '@/components/server/single-product/gallery-carousel';
import { getSingleProduct } from '@/actions/get-single-product';
import client from '@/components/client/ApolloClient';
import { PRODUCT_SLUGS } from '@/queries/product-by-slug';
import Image from 'next/image';

export default async function Product({ params }) {
	const { slug } = await params;

    const product = await getSingleProduct({ slug })
  

	return (
		<>
			{ product ? (
				<div className="single-product container mx-auto my-32 px-4 xl:px-0">
					<div className="grid md:grid-cols-2 gap-4">
						<div className="product-images">

							{ !isEmpty( product?.galleryImages?.nodes ) ? (
                                <GalleryCarousel gallery={product?.galleryImages?.nodes}/>
							) : !isEmpty( product.image ) ? (
                                <Image
                                    src={ product?.image?.sourceUrl }
                                    alt="Product Image"
                                    width="100%"
									height="100%"

                                />
							) : null }
						</div>
						<div className="product-info">
							<h4 className="products-main-title text-2xl uppercase">{ product.name }</h4>
							<div

								dangerouslySetInnerHTML={ {
									__html: product.description,
								} }
								className="product-description mb-5"
							/>
                            <Price salesPrice={product?.price} regularPrice={product?.regularPrice}/>
							<AddToCart product={ product }/>
						</div>
					</div>

				</div>
			) : (
				''
			) }
		</>
	);
};


export async function generateStaticParams() {
	const { data } = await client.query({
		query: PRODUCT_SLUGS
	})

	const pathsData = []

	data?.products?.nodes && data?.products?.nodes.map((product) => {
		if (!isEmpty(product?.slug)) {
			pathsData.push({ params: { slug: product?.slug } })
		}
	})

	return pathsData
}