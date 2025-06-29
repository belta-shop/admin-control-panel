'use server';

import { revalidateTag } from 'next/cache';

import { RevalidateTags } from '../config/api';
import { DEFAULT_LIMIT } from '../config/global';
import { ListResponse } from '../types/api/metadata';
import { Product, ProductDetails } from '../types/api/products';
import { getData, postData, deleteData } from '../utils/crud-fetch-api';

export async function getProduct(id: string) {
  const res = await getData<ProductDetails>('/products/staff/:id', {
    tags: [`${RevalidateTags.ProductSingle}-${id}`],
    params: { id },
  });

  if ('error' in res) throw new Error(res.error);

  return res.data;
}

export type ProductListQueries = Partial<
  Record<
    | 'page'
    | 'limit'
    | 'search'
    | 'disabled'
    | 'subcategory'
    | 'brand'
    | 'tag'
    | 'offer'
    | 'employeeReadOnly',
    string
  >
>;

export async function getProductList({
  page = '1',
  limit = DEFAULT_LIMIT.toString(),
  ...queries
}: ProductListQueries) {
  const res = await getData<ListResponse<Product>>('/products/staff', {
    queries: {
      page,
      limit,
      ...queries,
    },
    tags: [RevalidateTags.ProductList],
  });
  if ('error' in res) throw new Error(res.error);

  return res.data;
}

export async function deleteProduct(id: string) {
  const res = await deleteData('/products/staff/:id', {
    params: { id },
  });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.ProductList);
}

export async function linkProductToBrand({
  brandId,
  productId,
}: {
  brandId: string;
  productId: string;
}) {
  const res = await postData('/products/staff/link-brand', { brandId, productId });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.ProductList);
  revalidateTag(`${RevalidateTags.ProductSingle}-${productId}`);
  revalidateTag(`${RevalidateTags.BrandSingle}-${brandId}`);
}

export async function unlinkProductFromBrand(productId: string) {
  const res = await postData('/products/staff/unlink-brand', { productId });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.ProductList);
  revalidateTag(`${RevalidateTags.ProductSingle}-${productId}`);
}

export async function linkProductToSubCategory({
  subCategoryId,
  productId,
}: {
  subCategoryId: string;
  productId: string;
}) {
  const res = await postData('/products/staff/link-subcategory', {
    subcategoryId: subCategoryId,
    productId,
  });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.ProductList);
  revalidateTag(`${RevalidateTags.ProductSingle}-${productId}`);
  revalidateTag(`${RevalidateTags.SubCategorySingle}-${subCategoryId}`);
}

export async function unlinkProductFromSubCategory(productId: string) {
  const res = await postData('/products/staff/unlink-subcategory', { productId });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.ProductList);
  revalidateTag(`${RevalidateTags.ProductSingle}-${productId}`);
}
