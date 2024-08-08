import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const goodsApi = createApi({
  reducerPath: 'goodsApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/users/' }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getGoods: builder.query({
      query: (limit = '') => {
        console.log(limit)
        // return `goods?${limit && `_limit=${limit}`}`
        return 'getall'
      },
      providesTags: ['Product']
      // providesTags: (result) => ['Product']
      // result
      //   ? [...result.map(({ id }) => ({ type: 'Product', id })), 'Product']
      //   : ['Product'],
    }),
    addProduct: builder.mutation({
      query: (body) => ({
        // url: 'goods',
        url: 'add',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        // url: `goods/${id}`,
        url: `remove/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: (body) => ({
        // url: `goods/${body.id}`,
        url: `edit/${body.id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Product']
    })
  })
})

export const { useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation, useUpdateProductMutation } = goodsApi

