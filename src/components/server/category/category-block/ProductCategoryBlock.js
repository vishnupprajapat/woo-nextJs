import Link from 'next/link';
import Image from 'next/image';
import { DEFAULT_CATEGORY_IMG_URL } from '@/constants/urls';

const ProductCategoryBlock = ( props ) => {

	const { category } = props;


	return (
		<div className="product mb-5">
			<Link href={`/category/${category?.slug}`}>
					<Image
					width={308}
					height={308}
					    src={ category?.image?.sourceUrl ?? DEFAULT_CATEGORY_IMG_URL }
						className="object-cover h-40 md:h-64"
						defaultValue={DEFAULT_CATEGORY_IMG_URL}
						alt={category?.image?.altText ?? category.slug}
					/>
					<div className="product-title-container p-3">
						<h3 className="product-title text-lg font-medium">{category?.name}</h3>
						<span className="shop-now text-sm">+ Explore</span>
					</div>
			</Link>
		</div>
	);
}

export default ProductCategoryBlock;
