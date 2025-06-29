'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Grid, Stack, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import { yup } from '@/lib/utils/yup';
import { UserRole } from '@/lib/types/auth';
import { Link } from '@/lib/i18n/navigation';
import { useAuthStore } from '@/lib/store/auth';
import { TagDetails } from '@/lib/types/api/tags';
import RHFSwitch from '@/view/components/rhf-hooks/rhf-switch';
import RHFTextField from '@/view/components/rhf-hooks/rhf-textField';
import RHFFormProvider, { OnSubmitFunction } from '@/view/components/rhf-hooks/rhf-form-provider';

export interface TagFormData {
  nameAr: string;
  nameEn: string;
  disabled: boolean;
  employeeReadOnly: boolean;
}

interface TagFormProps {
  tag?: TagDetails;
  onSubmit: OnSubmitFunction;
  backPath?: string;
}

export default function TagNewEditForm({ tag, onSubmit, backPath }: TagFormProps) {
  const t = useTranslations();
  const { user } = useAuthStore();

  const methods = useForm<TagFormData>({
    resolver: yupResolver(
      yup.object().shape({
        nameAr: yup.string().required(t('Global.Validation.name_ar_required')),
        nameEn: yup.string().required(t('Global.Validation.name_en_required')),
        disabled: yup.boolean().default(false),
        employeeReadOnly: yup.boolean().default(false),
      })
    ),
    defaultValues: {
      nameAr: tag?.nameAr || '',
      nameEn: tag?.nameEn || '',
      disabled: tag?.disabled || false,
      employeeReadOnly: tag?.employeeReadOnly || false,
    },
  });

  const {
    formState: { isSubmitting },
  } = methods;

  return (
    <RHFFormProvider methods={methods} onSubmit={onSubmit} resetOnSuccess={!tag}>
      <Grid container spacing={2}>
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
          {tag ? t('Global.Action.update') : t('Global.Action.create')}
        </Button>
      </Stack>
    </RHFFormProvider>
  );
}
