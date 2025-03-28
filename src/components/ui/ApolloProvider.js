"use client"
import React from 'react'
import { ApolloProvider as Provider } from "@apollo/client";
import client from "../client/ApolloClient";
const ApolloProvider = ({children}) => {
  return (
    <Provider client={client}>{children}</Provider>
  )
}

export default ApolloProvider