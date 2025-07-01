'use client';

import { Switch } from '@mui/material';
import { useRouter } from 'next/navigation';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { useAuthStore } from '@/lib/store/auth';
import StatusChip from '@/view/components/status-chip';
import { SubCategory } from '@/lib/types/api/sub-categories';
import CustomImage from '@/view/components/image/custom-image';
import { useDialogActions } from '@/lib/hooks/use-dialog-actions';
import { SubCategoryDetails } from '@/lib/types/api/sub-categories';
import ApiListItem from '@/view/components/api-related/api-list-item';
import DetailsCard, { DetailsField, DetailsAction } from '@/view/components/details-card';

export default function SubCategorySingleDetails({
  subCategory,
}: {
  subCategory: SubCategory | SubCategoryDetails;
}) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const {
    openDeleteSubCategory,
    openLinkSubCategoryToCategory,
    openUnlinkSubCategoryFromCategory,
  } = useDialogActions();

  const fields: DetailsField[] = [
    {
      label: 'Global.Label.name_ar',
      value: subCategory.nameAr,
    },
    {
      label: 'Global.Label.name_en',
      value: subCategory.nameEn,
    },
    {
      label: 'Global.Label.disabled',
      value: <StatusChip value={!subCategory.disabled} />,
    },
    {
      label: 'Global.Label.employee_read_only',
      value: (
        <Switch
          checked={subCategory.employeeReadOnly}
          sx={{ '& input': { cursor: 'default !important' } }}
        />
      ),
    },
    ...(subCategory.category
      ? [
          {
            label: 'Global.Label.category',
            value: (
              <ApiListItem
                cover={subCategory.category.cover}
                nameAr={subCategory.category.nameAr}
                nameEn={subCategory.category.nameEn}
                href={paths.products.categories.single(subCategory.category._id)}
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
      onClick: () => router.push(paths.products.subCategories.edit(subCategory._id)),
    },
    {
      label: 'Global.Action.delete',
      icon: Icons.TRASH,
      onClick: () => openDeleteSubCategory(subCategory._id),
      color: 'error',
    },
    ...(!subCategory.category
      ? [
          {
            label: 'Pages.SubCategories.link_to_category',
            icon: Icons.LINK,
            onClick: () => openLinkSubCategoryToCategory(subCategory._id),
            color: 'info' as const,
          },
        ]
      : [
          {
            label: 'Pages.SubCategories.unlink_from_category',
            icon: Icons.UNLINK,
            onClick: () => openUnlinkSubCategoryFromCategory(subCategory._id),
            color: 'warning' as const,
          },
        ]),
  ];

  const imageComponent = (
    <CustomImage
      src={subCategory.cover}
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
      showActions={!(user?.role === UserRole.EMPLOYEE && subCategory.employeeReadOnly)}
    >
      {imageComponent}
    </DetailsCard>
  );
}
