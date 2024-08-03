import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const goodsApi = createApi({
  reducerPath: 'goodsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getGoods: builder.query({
      query: (limit = '') => {
        console.log(limit)
        return `goods?${limit && `_limit=${limit}`}`
      },
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Product', id })), 'Product']
          : ['Product'],
    }),
    addProduct: builder.mutation({
      query: (body) => ({
        url: 'goods',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Product'],
    })
  })
})

export const { useGetGoodsQuery, useAddProductMutation } = goodsApi

