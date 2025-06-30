'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Card,
  Stack,
  Button,
  MenuItem,
  Typography,
  CardContent,
  FormHelperText,
} from '@mui/material';

import { yup } from '@/lib/utils/yup';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { Link } from '@/lib/i18n/navigation';
import { useAuthStore } from '@/lib/store/auth';
import { OfferDetails } from '@/lib/types/api/offers';
import RHFSwitch from '@/view/components/rhf-hooks/rhf-switch';
import RHFTextField from '@/view/components/rhf-hooks/rhf-textField';
import ApiListItem from '@/view/components/api-related/api-list-item';
import { ProductsAutoComplete } from '@/view/components/api-related/auto-complete-modules';
import RHFFormProvider, { OnSubmitFunction } from '@/view/components/rhf-hooks/rhf-form-provider';

export interface OfferFormData {
  nameAr?: string;
  nameEn?: string;
  productId: string;
  type: 'percent' | 'fixed';
  value: number;
  disabled: boolean;
  offerQuantity: number;
  maxPerClient: number;
  employeeReadOnly: boolean;
}

interface OfferFormProps {
  offer?: OfferDetails;
  onSubmit: OnSubmitFunction;
  backPath?: string;
}

export default function OfferNewEditForm({ offer, onSubmit, backPath }: OfferFormProps) {
  const t = useTranslations();
  const { user } = useAuthStore();

  const [product, setProduct] = useState(offer?.product);

  const methods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        nameAr: yup.string().test({
          name: 'none-or-both',
          test(value, ctx) {
            const { nameEn } = ctx.parent;
            if (nameEn?.length > 0 && !value) {
              return ctx.createError({
                message: t('Global.Validation.name_ar_required'),
              });
            }
            return true;
          },
        }),
        nameEn: yup.string().test({
          name: 'none-or-both',
          test(value, ctx) {
            const { nameAr } = ctx.parent;
            if (nameAr?.length > 0 && !value) {
              return ctx.createError({
                message: t('Global.Validation.name_en_required'),
              });
            }
            return true;
          },
        }),
        productId: yup.string().required(t('Global.Validation.product_required')),
        type: yup
          .string()
          .oneOf(['percent', 'fixed'])
          .required(t('Global.Validation.type_required')),
        value: yup
          .number()
          .when('type', {
            is: (type: OfferFormData['type']) => type === 'percent',
            then: () =>
              yup
                .number()
                .typeError(t('Global.Validation.value_required'))
                .min(0.01, t('Global.Validation.value_min'))
                .max(0.99),
            otherwise: () =>
              yup
                .number()
                .typeError(t('Global.Validation.value_required'))
                .min(0.01, t('Global.Validation.value_min')),
          })
          .required(t('Global.Validation.value_required')),
        disabled: yup.boolean().default(false),
        offerQuantity: yup
          .number()
          .min(1, t('Global.Validation.offer_quantity_min'))
          .typeError(t('Global.Validation.offer_quantity_required'))
          .required(t('Global.Validation.offer_quantity_required')),
        maxPerClient: yup
          .number()
          .min(1, t('Global.Validation.max_per_client_min'))
          .typeError(t('Global.Validation.max_per_client_required'))
          .required(t('Global.Validation.max_per_client_required')),
        employeeReadOnly: yup.boolean().default(false),
      })
    ),
    defaultValues: {
      nameAr: offer?.nameAr || undefined,
      nameEn: offer?.nameEn || undefined,
      productId: offer?.product._id || '',
      type: offer?.type || 'percent',
      value: offer?.value || 0,
      disabled: offer?.disabled || false,
      offerQuantity: offer?.offerQuantity || 1,
      maxPerClient: offer?.maxPerClient || 1,
      employeeReadOnly: offer?.employeeReadOnly || false,
    },
  });

  const {
    formState: { isSubmitting },
    watch,
    setValue,
  } = methods;

  const type = watch('type');
  const value = watch('value');

  // Calculate prices
  const { originalPrice, minPrice, displayPrice, isMinPriceEnforced } = useMemo(() => {
    const originalPrice = product?.price || 0;
    const minPrice = product?.minPrice || 0;

    // Calculate new price
    let calculatedPrice = originalPrice;
    if (type === 'percent') {
      calculatedPrice = originalPrice * (1 - (value || 0));
    } else if (type === 'fixed') {
      calculatedPrice = originalPrice - (value || 0);
    }
    const displayPrice = calculatedPrice < minPrice ? minPrice : calculatedPrice;
    const isMinPriceEnforced = calculatedPrice < minPrice;

    return { originalPrice, minPrice, displayPrice, isMinPriceEnforced };
  }, [product, type, value]);

  return (
    <RHFFormProvider methods={methods} onSubmit={onSubmit} resetOnSuccess={!offer}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} useFlexGap sx={{ width: '100%' }}>
        <Stack spacing={2} flex={1}>
          <RHFTextField name="nameAr" label={t('Global.Label.name_ar')} fullWidth />
          <RHFTextField name="nameEn" label={t('Global.Label.name_en')} fullWidth />
          {offer ? (
            <ApiListItem
              cover={offer.product.coverList[0]}
              nameAr={offer.product.nameAr}
              nameEn={offer.product.nameEn}
              href={paths.products.products.single(offer.product._id)}
            />
          ) : (
            <ProductsAutoComplete
              onChange={(product) => {
                setValue('productId', product?._id || '');
                setProduct(product || undefined);
              }}
            />
          )}
          <RHFTextField
            name="offerQuantity"
            label={t('Global.Label.offer_quantity')}
            type="number"
            fullWidth
          />
          <RHFTextField
            name="maxPerClient"
            label={t('Global.Label.max_per_client')}
            type="number"
            fullWidth
          />
          <RHFSwitch name="disabled" label={t('Global.Label.disabled')} />
          <RHFSwitch
            name="employeeReadOnly"
            label={t('Global.Label.employee_read_only')}
            disabled={user?.role !== UserRole.ADMIN}
          />
        </Stack>
        <Stack spacing={2} flex={1}>
          {' '}
          <RHFTextField
            name="type"
            label={t('Global.Label.type')}
            select
            fullWidth
            slotProps={{
              select: {
                value: type,
                onChange: (e) => setValue('type', e.target.value as 'percent' | 'fixed'),
              },
            }}
          >
            <MenuItem value="percent">{t('Global.Label.percent')}</MenuItem>
            <MenuItem value="fixed">{t('Global.Label.fixed')}</MenuItem>
          </RHFTextField>
          <RHFTextField
            name="value"
            label={t('Global.Label.value')}
            type="number"
            slotProps={{
              htmlInput: {
                step: type === 'percent' ? 0.01 : 1,
                min: type === 'percent' ? 0.01 : 0.01,
                max: type === 'percent' ? 0.99 : undefined,
              },
            }}
            fullWidth
          />
          {product && (
            <Card sx={{ mt: 1 }}>
              <CardContent>
                <Stack spacing={1}>
                  <Box display="flex" flexWrap="wrap" alignItems="center" gap={1}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ minWidth: 120 }}
                      component="label"
                      htmlFor="original-price"
                    >
                      {t('Global.Label.original_price')}:
                    </Typography>
                    <Typography id="original-price" variant="subtitle1">
                      {originalPrice}
                    </Typography>
                  </Box>
                  <Box display="flex" flexWrap="wrap" alignItems="center" gap={1}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ minWidth: 120 }}
                      component="label"
                      htmlFor="minimum-price"
                    >
                      {t('Global.Label.min_price')}:
                    </Typography>
                    <Typography id="minimum-price" variant="subtitle1">
                      {minPrice}
                    </Typography>
                  </Box>
                  <Box display="flex" flexWrap="wrap" alignItems="center" gap={1}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ minWidth: 120 }}
                      component="label"
                      htmlFor="new-price"
                    >
                      {t('Global.Label.final_price')}:
                    </Typography>
                    <Typography id="new-price" variant="h6">
                      {displayPrice}
                    </Typography>
                  </Box>
                  {isMinPriceEnforced && (
                    <FormHelperText error sx={{ ml: 0.5 }}>
                      {t('Global.Helper.min_price_enforced')}
                    </FormHelperText>
                  )}
                </Stack>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1} justifyContent="flex-end" mt={2}>
        {backPath && (
          <Button variant="outlined" size="large" LinkComponent={Link} href={backPath}>
            {t('Global.Action.back')}
          </Button>
        )}
        <Button type="submit" variant="contained" size="large" loading={isSubmitting}>
          {offer ? t('Global.Action.update') : t('Global.Action.create')}
        </Button>
      </Stack>
    </RHFFormProvider>
  );
}
