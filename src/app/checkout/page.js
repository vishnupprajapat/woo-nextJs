
import { getCountries } from "@/actions/get-contries";
import CheckoutForm from "@/components/checkout/CheckoutForm";


const Checkout = async () =>{
    const  data = await getCountries()
    return(
        <div className="checkout container mx-auto my-32 px-4 xl:px-0">
        <h1 className="mb-5 text-2xl uppercase">Checkout Page</h1>
        <CheckoutForm countriesData={data?.wooCountries ?? {}}/>
    </div>
    )
}

export default Checkout;

// export async function getStaticProps() {
// 	const { data } = await client.query({
// 		query: GET_COUNTRIES
// 	});

// 	return {
// 		props: {
// 			data: data || {}
// 		},
// 		revalidate: 1
// 	};

// }
