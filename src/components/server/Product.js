import Link from 'next/link';
import { DEFAULT_PRODUCT_HOME_IMG_URL } from '@/constants/urls';
import Image from 'next/image';
import Price from './single-product/price';
import AddToCart from '../client/cart/AddToCartButton';

const Product = ( props ) => {
	const { product } = props;

	return (
		// @TODO Need to handle Group products differently.
		undefined !== product && 'GroupProduct' !== product.__typename ? (
			<div className="product mb-5">


				<Link href={ `/product/${ product?.slug }`} >
						<Image
							className="object-cover bg-gray-100"
							src={ product?.image?.sourceUrl }
							alt={product?.image?.altText ?? product?.slug}
							width="308"
							height="308"
							loading="lazy"
							defaultValue={DEFAULT_PRODUCT_HOME_IMG_URL}
						
						/>
				</Link>
				<div className="product-info">
					<h3 className="product-title mt-3 font-medium text-gray-800">
						{ product.name ? product.name : '' }
					</h3>
					<div className="product-description text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: (product?.description)}}/>
					<Price salesPrice={product?.price} regularPrice={product?.regularPrice}/>
					<AddToCart product={ product }/>
				</div>

			</div>
		) : (
			''
		)
	);
};

export default Product;
