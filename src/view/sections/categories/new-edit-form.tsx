'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Grid, Stack, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import { yup } from '@/lib/utils/yup';
import { UserRole } from '@/lib/types/auth';
import { Link } from '@/lib/i18n/navigation';
import { useAuthStore } from '@/lib/store/auth';
import { Category } from '@/lib/types/api/categories';
import RHFSwitch from '@/view/components/rhf-hooks/rhf-switch';
import RHFUpload from '@/view/components/rhf-hooks/rhf-upload';
import RHFTextField from '@/view/components/rhf-hooks/rhf-textField';
import RHFFormProvider, { OnSubmitFunction } from '@/view/components/rhf-hooks/rhf-form-provider';

export interface CategoryFormData {
  nameAr: string;
  nameEn: string;
  cover: File | string;
  disabled: boolean;
  employeeReadOnly: boolean;
}

interface CategoryFormProps {
  category?: Category;
  onSubmit: OnSubmitFunction;
  backPath?: string;
}

export default function CategoryNewEditForm({ category, onSubmit, backPath }: CategoryFormProps) {
  const t = useTranslations();
  const { user } = useAuthStore();

  const methods = useForm<CategoryFormData>({
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
      nameAr: category?.nameAr || '',
      nameEn: category?.nameEn || '',
      cover: category?.cover || undefined,
      disabled: category?.disabled || false,
      employeeReadOnly: category?.employeeReadOnly || false,
    },
  });

  const {
    formState: { isSubmitting },
  } = methods;

  return (
    <RHFFormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <RHFUpload name="cover" label={t('Global.Label.cover')} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }} />
        <Grid size={{ xs: 12, sm: 6 }}>
          <RHFTextField name="nameAr" label={t('Global.Label.name_ar')} fullWidth />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <RHFTextField name="nameEn" label={t('Global.Label.name_en')} fullWidth />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <RHFSwitch name="disabled" label={t('Global.Label.disabled')} />
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
          {category ? t('Global.Action.update') : t('Global.Action.create')}
        </Button>
      </Stack>
    </RHFFormProvider>
  );
}
