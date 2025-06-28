import { SxProps } from '@mui/material';
import { useTranslations } from 'next-intl';

import { Brand } from '@/lib/types/api/brands';
import { Product } from '@/lib/types/api/products';
import { getBrandList } from '@/lib/actions/brands';
import { Category } from '@/lib/types/api/categories';
import { getProductList } from '@/lib/actions/product';
import { getCategoryList } from '@/lib/actions/category';
import { SubCategory } from '@/lib/types/api/sub-categories';
import { getSubCategoryList } from '@/lib/actions/sub-category';

import ApiAutoComplete from './api-auto-complete';

interface Props<T> {
  onChange: (category: T | null) => void;
  defaultValue?: string | null;
  sx?: SxProps;
}

export function CategoriesAutoComplete(props: Props<Category>) {
  const t = useTranslations('Global.Label');
  return (
    <ApiAutoComplete
      label={t('category')}
      searchFunction={async (search) => (await getCategoryList({ search })).items}
      {...props}
    />
  );
}

export function SubCategoriesAutoComplete(props: Props<SubCategory>) {
  const t = useTranslations('Global.Label');
  return (
    <ApiAutoComplete
      label={t('subCategory')}
      searchFunction={async (search) => (await getSubCategoryList({ search })).items}
      {...props}
    />
  );
}

export function BrandsAutoComplete(props: Props<Brand>) {
  const t = useTranslations('Global.Label');
  return (
    <ApiAutoComplete
      label={t('brand')}
      searchFunction={async (search) => (await getBrandList({ search })).items}
      {...props}
    />
  );
}

export function ProductsAutoComplete(props: Props<Product>) {
  const t = useTranslations('Global.Label');
  return (
    <ApiAutoComplete
      label={t('product')}
      searchFunction={async (search) => (await getProductList({ search })).data}
      {...props}
    />
  );
}
