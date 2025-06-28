'use client';

import { Switch } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { useAuthStore } from '@/lib/store/auth';
import { useRouter } from '@/lib/i18n/navigation';
import { Iconify } from '@/view/components/iconify';
import { useBoolean } from '@/lib/hooks/use-boolean';
import { SubCategory } from '@/lib/types/api/sub-categories';
import CustomImage from '@/view/components/image/custom-image';
import DeleteDialog from '@/view/components/dialog/delete-dialog';
import ConfirmDialog from '@/view/components/dialog/confirm-dialog';
import CustomTable from '@/view/components/custom-table/custom-table';
import { deleteSubCategory, unlinkSubCategoryFromCategory } from '@/lib/actions/sub-category';

import SubCategoryLinkCategoryDialog from './link-category-dialog';

interface Props {
  items: SubCategory[];
  total: number;
  disablePagination?: boolean;
}

export default function SubCategoryListTable({ items, total, disablePagination }: Props) {
  const t = useTranslations('Global');
  const { enqueueSnackbar } = useSnackbar();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const [selectedUnlinkId, setSelectedUnlinkId] = useState<string | null>(null);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const unlinking = useBoolean(false);
  const deleting = useBoolean(false);

  const handleCloseDeleteDialog = useCallback(() => {
    setSelectedDeleteId(null);
    deleting.onFalse();
  }, [deleting, setSelectedDeleteId]);

  const handleCloseUnlinkDialog = useCallback(() => {
    setSelectedUnlinkId(null);
    unlinking.onFalse();
  }, [unlinking, setSelectedUnlinkId]);

  const handleConfirmDelete = async () => {
    if (!selectedDeleteId) return;

    try {
      deleting.onTrue();

      await deleteSubCategory(selectedDeleteId);

      enqueueSnackbar(t('Message.delete_success', { name: t('Label.sub_category') }));
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      deleting.onFalse();
      handleCloseDeleteDialog();
    }
  };

  const handleConfirmUnlink = async () => {
    if (!selectedUnlinkId) return;

    try {
      unlinking.onTrue();

      await unlinkSubCategoryFromCategory(selectedUnlinkId);

      enqueueSnackbar(t('Message.unlink_success', { name: t('Label.sub_category') }));
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      unlinking.onFalse();
      handleCloseUnlinkDialog();
    }
  };

  return (
    <>
      <CustomTable
        tableHead={tableHead}
        data={items.map((item) => ({ ...item, id: item._id }))}
        count={total}
        disablePagination={disablePagination}
        customRender={customRender}
        actions={[
          {
            label: 'Global.Action.view',
            icon: <Iconify icon={Icons.EYE_FILLED} />,
            onClick: (item) => router.push(paths.products.subCategories.single(item.id)),
          },
          {
            label: 'Global.Action.edit',
            icon: <Iconify icon={Icons.PENCIL} />,
            onClick: (item) => router.push(paths.products.subCategories.edit(item.id)),
            hide: (item) => item.employeeReadOnly && user?.role === UserRole.EMPLOYEE,
          },
          {
            label: 'Global.Action.delete',
            icon: <Iconify icon={Icons.TRASH} />,
            onClick: (item) => setSelectedDeleteId(item.id),
            sx: { color: 'error.main' },
            hide: (item) => item.employeeReadOnly && user?.role === UserRole.EMPLOYEE,
          },
          {
            label: 'Pages.SubCategories.link_to_category',
            icon: <Iconify icon={Icons.LINK} />,
            onClick: (item) => setSelectedLinkId(item.id),
            sx: { color: 'info.main' },
            hide: (item) =>
              !!item.category || (item.employeeReadOnly && user?.role === UserRole.EMPLOYEE),
          },
          {
            label: 'Pages.SubCategories.unlink_from_category',
            icon: <Iconify icon={Icons.UNLINK} />,
            onClick: (item) => setSelectedUnlinkId(item.id),
            sx: { color: 'warning.main' },
            hide: (item) =>
              !item.category || (item.employeeReadOnly && user?.role === UserRole.EMPLOYEE),
          },
        ]}
      />

      <DeleteDialog
        label={t('Label.sub_category')}
        isOpen={!!selectedDeleteId}
        onClose={handleCloseDeleteDialog}
        handleDelete={handleConfirmDelete}
        loading={deleting.value}
      />

      <SubCategoryLinkCategoryDialog
        open={!!selectedLinkId}
        onClose={() => setSelectedLinkId(null)}
        subCategoryId={selectedLinkId || undefined}
      />

      <ConfirmDialog
        title={t('Dialog.unlink_title', { label: t('Label.sub_category') })}
        isOpen={!!selectedUnlinkId}
        onClose={handleCloseUnlinkDialog}
        handleConfirm={handleConfirmUnlink}
        loading={unlinking.value}
        actionProps={{
          color: 'warning',
          variant: 'contained',
          startIcon: <Iconify icon={Icons.UNLINK} />,
          children: t('Action.unlink'),
        }}
      >
        {t('Dialog.unlink_content', {
          label: t('Label.sub_category').toLowerCase(),
          parent: t('Label.category').toLowerCase(),
        })}
      </ConfirmDialog>
    </>
  );
}

const tableHead = [
  { id: 'cover', label: 'cover' },
  { id: 'nameAr', label: 'name_ar' },
  { id: 'nameEn', label: 'name_en' },
  { id: 'disabled', label: 'disabled' },
  { id: 'employeeReadOnly', label: 'employee_read_only' },
];

const customRender = {
  cover: (row: SubCategory) => <CustomImage src={row.cover} />,
  disabled: (row: SubCategory) => (
    <Switch checked={row.disabled} sx={{ '& input': { cursor: 'default !important' } }} />
  ),
  employeeReadOnly: (row: SubCategory) => (
    <Switch checked={row.employeeReadOnly} sx={{ '& input': { cursor: 'default !important' } }} />
  ),
};
