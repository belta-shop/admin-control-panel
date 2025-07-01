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
import { ProductDetails } from '@/lib/types/api/products';
import RHFSwitch from '@/view/components/rhf-hooks/rhf-switch';
import RHFTextField from '@/view/components/rhf-hooks/rhf-textField';
import RHFUploadMulti from '@/view/components/rhf-hooks/rhf-upload-multi';
import RHFReversedSwitch from '@/view/components/rhf-hooks/rhf-reversed-switch';
import RHFFormProvider, { OnSubmitFunction } from '@/view/components/rhf-hooks/rhf-form-provider';

export interface ProductFormData {
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  coverList: (File | string)[];
  quantity: number;
  minPrice: number;
  price: number;
  disabled: boolean;
  employeeReadOnly: boolean;
}

interface ProductFormProps {
  product?: ProductDetails;
  onSubmit: OnSubmitFunction;
  backPath?: string;
}

export default function ProductNewEditForm({ product, onSubmit, backPath }: ProductFormProps) {
  const t = useTranslations();
  const { user } = useAuthStore();

  const methods = useForm<ProductFormData>({
    resolver: yupResolver(
      yup.object().shape({
        nameAr: yup.string().required(t('Global.Validation.name_ar_required')),
        nameEn: yup.string().required(t('Global.Validation.name_en_required')),
        descriptionAr: yup.string().required(t('Global.Validation.description_ar_required')),
        descriptionEn: yup.string().required(t('Global.Validation.description_en_required')),
        coverList: yup
          .array()
          .of(yup.mixed<File | string>().required(t('Global.Validation.cover_required')))
          .min(1, t('Global.Validation.cover_required'))
          .required(t('Global.Validation.cover_required')),
        quantity: yup
          .number()
          .min(0, t('Global.Validation.quantity_min'))
          .required(t('Global.Validation.quantity_required')),
        minPrice: yup
          .number()
          .min(0, t('Global.Validation.min_price_min'))
          .required(t('Global.Validation.min_price_required')),
        price: yup
          .number()
          .min(0, t('Global.Validation.price_min'))
          .required(t('Global.Validation.price_required')),
        disabled: yup.boolean().default(false),
        employeeReadOnly: yup.boolean().default(false),
      })
    ),
    defaultValues: {
      nameAr: product?.nameAr || '',
      nameEn: product?.nameEn || '',
      descriptionAr: product?.descriptionAr || '',
      descriptionEn: product?.descriptionEn || '',
      coverList: product?.coverList || [],
      quantity: product?.quantity || 0,
      minPrice: product?.minPrice || 0,
      price: product?.price || 0,
      disabled: product?.disabled || false,
      employeeReadOnly: product?.employeeReadOnly || false,
    },
  });

  const {
    formState: { isSubmitting },
  } = methods;

  return (
    <RHFFormProvider methods={methods} onSubmit={onSubmit} resetOnSuccess={!product}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <RHFUploadMulti
            name="coverList"
            label={t('Global.Label.cover_list')}
            icon={Icons.UPLOAD}
            variant="images"
            draggable
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <RHFTextField name="nameAr" label={t('Global.Label.name_ar')} fullWidth />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <RHFTextField name="nameEn" label={t('Global.Label.name_en')} fullWidth />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <RHFTextField
            name="descriptionAr"
            label={t('Global.Label.description_ar')}
            fullWidth
            multiline
            rows={3}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <RHFTextField
            name="descriptionEn"
            label={t('Global.Label.description_en')}
            fullWidth
            multiline
            rows={3}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <RHFTextField
            name="quantity"
            label={t('Global.Label.quantity')}
            type="number"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <RHFTextField
            name="minPrice"
            label={t('Global.Label.min_price')}
            type="number"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <RHFTextField name="price" label={t('Global.Label.price')} type="number" fullWidth />
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
          {product ? t('Global.Action.update') : t('Global.Action.create')}
        </Button>
      </Stack>
    </RHFFormProvider>
  );
}
