'use client';

import { useState } from 'react';
import { Switch } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { useAuthStore } from '@/lib/store/auth';
import { useRouter } from '@/lib/i18n/navigation';
import { axiosInstance } from '@/lib/utils/axios';
import { endpoints } from '@/lib/config/endpoints';
import { Iconify } from '@/view/components/iconify';
import { invalidatePath } from '@/lib/actions/server-utils';
import { SubCategory } from '@/lib/types/api/sub-categories';
import CustomImage from '@/view/components/image/custom-image';
import DeleteDialog from '@/view/components/dialog/delete-dialog';
import ConfirmDialog from '@/view/components/dialog/confirm-dialog';
import CustomTable from '@/view/components/custom-table/custom-table';

import SubCategoryLinkCategoryDialog from './link-category-dialog';

interface Props {
  items: SubCategory[];
  total: number;
  disablePagination?: boolean;
}

export default function SubCategoryListTable({ items, total, disablePagination }: Props) {
  const t = useTranslations('Global');
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const [selectedUnlinkId, setSelectedUnlinkId] = useState<string | null>(null);
  const [isUnlinking, setIsUnlinking] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleCloseDeleteDialog = () => {
    setSelectedDeleteId(null);
    setIsDeleting(false);
  };

  const handleCloseUnlinkDialog = () => {
    setSelectedUnlinkId(null);
    setIsUnlinking(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedDeleteId) return;

    try {
      setIsDeleting(true);

      await axiosInstance.delete(endpoints.subCategories.delete(selectedDeleteId));
      await invalidatePath(paths.products.subCategories.list);

      enqueueSnackbar(t('Message.delete_success', { name: t('Label.sub_category') }));
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setIsDeleting(false);
      handleCloseDeleteDialog();
    }
  };

  const handleConfirmUnlink = async () => {
    if (!selectedUnlinkId) return;

    try {
      setIsUnlinking(true);

      await axiosInstance.post(endpoints.subCategories.unlinkFromCategory, {
        subcategoryId: selectedUnlinkId,
      });
      await invalidatePath(paths.products.subCategories.list);

      enqueueSnackbar(t('Message.unlink_success', { name: t('Label.sub_category') }));
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setIsUnlinking(false);
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
        loading={isDeleting}
      />

      <SubCategoryLinkCategoryDialog
        open={!!selectedLinkId}
        onClose={() => setSelectedLinkId(null)}
        subCategoryId={selectedLinkId || undefined}
      />

      <ConfirmDialog
        title={t('Dialog.unlink_title', { label: t('Label.sub_category') })}
        content={t('Dialog.unlink_content', { label: t('Label.sub_category').toLowerCase() })}
        isOpen={!!selectedUnlinkId}
        onClose={handleCloseUnlinkDialog}
        handleConfirm={handleConfirmUnlink}
        loading={isUnlinking}
        actionProps={{
          color: 'warning',
          variant: 'contained',
          startIcon: <Iconify icon={Icons.UNLINK} />,
          children: t('Action.unlink'),
        }}
      />
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
