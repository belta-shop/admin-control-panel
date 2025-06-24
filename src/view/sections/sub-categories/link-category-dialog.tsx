import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';
import { Box, Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { paths } from '@/lib/config/paths';
import { axiosInstance } from '@/lib/utils/axios';
import { endpoints } from '@/lib/config/endpoints';
import { Category } from '@/lib/types/api/categories';
import { invalidatePath } from '@/lib/actions/server-utils';

import SearchCategoryInput from './search-category-input';

interface Props {
  open: boolean;
  onClose: () => void;
  subCategoryId?: string;
}

export default function SubCategoryLinkCategoryDialog({ open, onClose, subCategoryId }: Props) {
  const t = useTranslations();

  const { enqueueSnackbar } = useSnackbar();

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleClose = useCallback(() => {
    setSelectedCategory(null);
    onClose();
  }, [onClose]);

  const handleConfirm = useCallback(async () => {
    try {
      if (selectedCategory && subCategoryId) {
        setConfirmLoading(true);
        await axiosInstance.post(endpoints.subCategories.linkToCategory, {
          subcategoryId: subCategoryId,
          categoryId: selectedCategory._id,
        });
        enqueueSnackbar(t('Global.Message.link_success', { name: t('Global.Label.sub_category') }));
        await invalidatePath(paths.products.subCategories.list);
        handleClose();
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setConfirmLoading(false);
    }
  }, [selectedCategory, subCategoryId, enqueueSnackbar, t, handleClose]);

  const isConfirmDisabled = !selectedCategory || !subCategoryId;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('Pages.SubCategories.link_to_category')}</DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <SearchCategoryInput onChange={setSelectedCategory} />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          {t('Global.Action.cancel')}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={isConfirmDisabled}
          loading={confirmLoading}
        >
          {t('Global.Action.link')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
