/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import { BASE_URL } from "../constants";

/* ~ ~ ~ ~ ~ Local Variables ~ ~ ~ ~ ~ */
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL
});

/* ~ ~ ~ ~ ~ Create and Export Slice ~ ~ ~ ~ ~ */
export const apiSlice = createApi({
  baseQuery,
  tagTypes: [
    'Product',
    'User',
    'Order'
  ],
  endpoints: (builder) => ({})
});
