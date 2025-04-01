"use client";
import { useState, useEffect, useContext, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { ShoppingCart } from "@/icons";
import { AppContext } from "@/context/AppContext";

const ThankYouContent = () => {
  const [cart, setCart] = useContext(AppContext);
  const [isSessionFetching, setSessionFetching] = useState(false);
  const [sessionData, setSessionData] = useState({});
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  useEffect(() => {
    setSessionFetching(true);
    if (typeof window !== "undefined") {
      localStorage.removeItem("woo-next-cart");
      setCart(null);
      if (session_id) {
        axios
          .get(`/api/get-stripe-session/?session_id=${session_id}`)
          .then((response) => {
            setSessionData(response?.data ?? {});
            setSessionFetching(false);
          })
          .catch((error) => {
            console.log(error);
            setSessionFetching(false);
          });
      }
    }
  }, [session_id]);

  return (
    <div className="h-almost-screen">
      <div className="w-600px mt-10 m-auto">
        <h2 className="mb-6 text-xl">
          <ShoppingCart className="inline-block mr-1" />{" "}
          <span>Thank you for placing the order.</span>
        </h2>
        <p>Your payment is successful and your order details are:</p>
        <table className="table-auto w-full text-left whitespace-no-wrap mb-8">
          <thead>
            <tr>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                Name
              </th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-3">Order#</td>
              <td className="px-4 py-3">{sessionData?.metadata?.orderId}</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Email</td>
              <td className="px-4 py-3">{sessionData?.customer_email}</td>
            </tr>
          </tbody>
        </table>
        <Link href="/">
          <span className="bg-purple-600 text-white px-5 py-3 rounded-sm w-auto">
            Shop more
          </span>
        </Link>
      </div>
    </div>
  );
};

const ThankYou = () => {
  return (
    <Suspense fallback={<div className="text-center"><h2 className="text-2xl">Loading...</h2></div>}>
      <ThankYouContent />
    </Suspense>
  );
};

export default ThankYou;
