'use client';

import { Switch } from '@mui/material';
import { useRouter } from 'next/navigation';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { useAuthStore } from '@/lib/store/auth';
import { Product } from '@/lib/types/api/products';
import StatusChip from '@/view/components/status-chip';
import { ProductDetails } from '@/lib/types/api/products';
import CustomImage from '@/view/components/image/custom-image';
import { useDialogActions } from '@/lib/hooks/use-dialog-actions';
import ApiListItem from '@/view/components/api-related/api-list-item';
import DetailsCard, { DetailsField, DetailsAction } from '@/view/components/details-card';

export default function ProductSingleDetails({ product }: { product: Product | ProductDetails }) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const {
    openDeleteProduct,
    openLinkProductToBrand,
    openLinkProductToSubCategory,
    openUnlinkProductFromBrand,
    openUnlinkProductFromSubCategory,
  } = useDialogActions();

  const fields: DetailsField[] = [
    {
      label: 'Global.Label.name_ar',
      value: product.nameAr,
    },
    {
      label: 'Global.Label.name_en',
      value: product.nameEn,
    },
    {
      label: 'Global.Label.disabled',
      value: <StatusChip value={!product.disabled} />,
    },
    {
      label: 'Global.Label.employee_read_only',
      value: (
        <Switch
          checked={product.employeeReadOnly}
          sx={{ '& input': { cursor: 'default !important' } }}
        />
      ),
    },
    ...(product.subcategory
      ? [
          {
            label: 'Global.Label.sub_category',
            value: (
              <ApiListItem
                cover={product.subcategory.cover}
                nameAr={product.subcategory.nameAr}
                nameEn={product.subcategory.nameEn}
                href={paths.products.subCategories.single(product.subcategory._id)}
              />
            ),
          },
        ]
      : []),
    ...(product.brand
      ? [
          {
            label: 'Global.Label.brand',
            value: (
              <ApiListItem
                cover={product.brand.cover}
                nameAr={product.brand.nameAr}
                nameEn={product.brand.nameEn}
                href={paths.products.brands.single(product.brand._id)}
              />
            ),
          },
        ]
      : []),
  ];

  const actions: DetailsAction[] = [
    {
      label: 'Global.Action.edit',
      icon: Icons.PENCIL,
      onClick: () => router.push(paths.products.products.edit(product._id)),
    },
    {
      label: 'Global.Action.delete',
      icon: Icons.TRASH,
      onClick: () => openDeleteProduct(product._id),
      color: 'error',
    },
    ...(!product.subcategory
      ? [
          {
            label: 'Pages.Products.link_to_sub_category',
            icon: Icons.LINK,
            onClick: () => openLinkProductToSubCategory(product._id),
            color: 'info' as const,
          },
        ]
      : [
          {
            label: 'Pages.Products.unlink_from_sub_category',
            icon: Icons.UNLINK,
            onClick: () => openUnlinkProductFromSubCategory(product._id),
            color: 'warning' as const,
          },
        ]),
    ...(!product.brand
      ? [
          {
            label: 'Pages.Products.link_to_brand',
            icon: Icons.LINK,
            onClick: () => openLinkProductToBrand(product._id),
            color: 'info' as const,
          },
        ]
      : [
          {
            label: 'Pages.Products.unlink_from_brand',
            icon: Icons.UNLINK,
            onClick: () => openUnlinkProductFromBrand(product._id),
            color: 'warning' as const,
          },
        ]),
  ];

  const imageComponent = (
    <CustomImage
      src={product.coverList[0]}
      sx={{
        width: { xs: '100%', sm: '200px' },
        flexShrink: 0,
        height: 'auto',
        aspectRatio: 1,
      }}
    />
  );

  return (
    <DetailsCard
      fields={fields}
      actions={actions}
      showActions={!(user?.role === UserRole.EMPLOYEE && product.employeeReadOnly)}
    >
      {imageComponent}
    </DetailsCard>
  );
}
