'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Grid, Stack, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import { yup } from '@/lib/utils/yup';
import { Icons } from '@/lib/config/icons';
import { UserRole } from '@/lib/types/auth';
import { Link } from '@/lib/i18n/navigation';
import { useAuthStore } from '@/lib/store/auth';
import RHFSwitch from '@/view/components/rhf-hooks/rhf-switch';
import RHFUpload from '@/view/components/rhf-hooks/rhf-upload';
import { SubCategoryDetails } from '@/lib/types/api/sub-categories';
import RHFTextField from '@/view/components/rhf-hooks/rhf-textField';
import RHFReversedSwitch from '@/view/components/rhf-hooks/rhf-reversed-switch';
import RHFFormProvider, { OnSubmitFunction } from '@/view/components/rhf-hooks/rhf-form-provider';

export interface SubCategoryFormData {
  nameAr: string;
  nameEn: string;
  cover: File | string;
  disabled: boolean;
  employeeReadOnly: boolean;
}

interface SubCategoryFormProps {
  subCategory?: SubCategoryDetails;
  onSubmit: OnSubmitFunction;
  backPath?: string;
}

export default function SubCategoryNewEditForm({
  subCategory,
  onSubmit,
  backPath,
}: SubCategoryFormProps) {
  const t = useTranslations();
  const { user } = useAuthStore();

  const methods = useForm<SubCategoryFormData>({
    resolver: yupResolver(
      yup.object().shape({
        nameAr: yup.string().required(t('Global.Validation.name_ar_required')),
        nameEn: yup.string().required(t('Global.Validation.name_en_required')),
        cover: yup.mixed<File | string>().required(t('Global.Validation.cover_required')),
        disabled: yup.boolean().default(false),
        employeeReadOnly: yup.boolean().default(false),
      })
    ),
    defaultValues: {
      nameAr: subCategory?.nameAr || '',
      nameEn: subCategory?.nameEn || '',
      cover: subCategory?.cover || undefined,
      disabled: subCategory?.disabled || false,
      employeeReadOnly: subCategory?.employeeReadOnly || false,
    },
  });

  const {
    formState: { isSubmitting },
  } = methods;

  return (
    <RHFFormProvider methods={methods} onSubmit={onSubmit} resetOnSuccess={!subCategory}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <RHFUpload
            name="cover"
            label={t('Global.Label.cover')}
            icon={Icons.UPLOAD}
            variant="images"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }} />
        <Grid size={{ xs: 12, sm: 6 }}>
          <RHFTextField name="nameAr" label={t('Global.Label.name_ar')} fullWidth />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <RHFTextField name="nameEn" label={t('Global.Label.name_en')} fullWidth />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <RHFReversedSwitch name="disabled" label={t('Global.Label.status')} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <RHFSwitch
            name="employeeReadOnly"
            label={t('Global.Label.employee_read_only')}
            disabled={user?.role !== UserRole.ADMIN}
          />
        </Grid>
      </Grid>

      <Stack direction="row" spacing={1} justifyContent="flex-end" mt={2}>
        {backPath && (
          <Button variant="outlined" size="large" LinkComponent={Link} href={backPath}>
            {t('Global.Action.back')}
          </Button>
        )}
        <Button type="submit" variant="contained" size="large" loading={isSubmitting}>
          {subCategory ? t('Global.Action.update') : t('Global.Action.create')}
        </Button>
      </Stack>
    </RHFFormProvider>
  );
}
