
import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from "@apollo/client";

/**
 * Middleware: Adds the session token from localStorage to request headers.
 */
const middleware = new ApolloLink((operation, forward) => {
	if (typeof window !== "undefined") {
		const session = localStorage.getItem("woo-session");

		if (session) {
			operation.setContext(({ headers = {} }) => ({
				headers: {
					...headers,
					"woocommerce-session": `Session ${session}`,
				},
			}));
		}
	}

	return forward(operation);
});

/**
 * Afterware: Stores session token from response headers in localStorage.
 */
const afterware = new ApolloLink((operation, forward) => {
	return forward(operation).map((response) => {
		if (typeof window !== "undefined") {
			const context = operation.getContext();
			const session = context?.response?.headers?.get("woocommerce-session");

			if (session) {
				if (session === "false") {
					localStorage.removeItem("woo-session");
				} else if (localStorage.getItem("woo-session") !== session) {
					localStorage.setItem("woo-session", session);
				}
			}
		}
		return response;
	});
});

// Create the HTTP link for GraphQL requests
const httpLink = createHttpLink({
	uri: process.env.NEXT_PUBLIC_WORDPRESS_URL + "/graphql",
	fetch,
});

// Initialize Apollo Client
const client = new ApolloClient({
	link: ApolloLink.from([middleware, afterware, httpLink]),
	cache: new InMemoryCache(),
	ssrMode: typeof window === "undefined", // Ensures proper SSR handling in Next.js
});

export default client;
