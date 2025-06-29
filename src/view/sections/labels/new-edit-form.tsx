'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Stack, alpha, Button, useTheme } from '@mui/material';

import { yup } from '@/lib/utils/yup';
import { UserRole } from '@/lib/types/auth';
import { Link } from '@/lib/i18n/navigation';
import { useAuthStore } from '@/lib/store/auth';
import { LabelDetails } from '@/lib/types/api/labels';
import RHFSwitch from '@/view/components/rhf-hooks/rhf-switch';
import RHFTextField from '@/view/components/rhf-hooks/rhf-textField';
import RHFColorField from '@/view/components/rhf-hooks/rhf-color-field';
import RHFFormProvider, { OnSubmitFunction } from '@/view/components/rhf-hooks/rhf-form-provider';

export interface LabelFormData {
  nameAr: string;
  nameEn: string;
  color: string;
  disabled: boolean;
  employeeReadOnly: boolean;
}

interface LabelFormProps {
  label?: LabelDetails;
  onSubmit: OnSubmitFunction;
  backPath?: string;
}

export default function LabelNewEditForm({ label, onSubmit, backPath }: LabelFormProps) {
  const t = useTranslations();
  const { user } = useAuthStore();
  const theme = useTheme();

  const methods = useForm<LabelFormData>({
    resolver: yupResolver(
      yup.object().shape({
        nameAr: yup.string().required(t('Global.Validation.name_ar_required')),
        nameEn: yup.string().required(t('Global.Validation.name_en_required')),
        color: yup.string().required(t('Global.Validation.color_required')),
        disabled: yup.boolean().default(false),
        employeeReadOnly: yup.boolean().default(false),
      })
    ),
    defaultValues: {
      nameAr: label?.nameAr || '',
      nameEn: label?.nameEn || '',
      color: label?.color || alpha(theme.palette.primary.main, 1),
      disabled: label?.disabled || false,
      employeeReadOnly: label?.employeeReadOnly || false,
    },
  });

  const {
    formState: { isSubmitting },
  } = methods;

  return (
    <RHFFormProvider methods={methods} onSubmit={onSubmit} resetOnSuccess={!label}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, sm: 6 }}>
          <RHFTextField name="nameAr" label={t('Global.Label.name_ar')} fullWidth />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <RHFTextField name="nameEn" label={t('Global.Label.name_en')} fullWidth />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <RHFColorField name="color" label={t('Global.Label.color')} fullWidth />
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
          {label ? t('Global.Action.update') : t('Global.Action.create')}
        </Button>
      </Stack>
    </RHFFormProvider>
  );
}
