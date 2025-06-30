'use client';

import { Card, CardContent, Grid, Typography, Switch } from '@mui/material';
import { useTranslations } from 'next-intl';

import { OfferDetails } from '@/lib/types/api/offers';

interface Props {
  offer: OfferDetails;
}

export default function OfferSingleView({ offer }: Props) {
  const t = useTranslations();

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('Global.Label.name_ar')}
            </Typography>
            <Typography variant="body1">{offer.nameAr || '-'}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('Global.Label.name_en')}
            </Typography>
            <Typography variant="body1">{offer.nameEn || '-'}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('Global.Label.product')}
            </Typography>
            <Typography variant="body1">
              {offer.product?.nameEn || offer.product?.nameAr || '-'}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('Global.Label.type')}
            </Typography>
            <Typography variant="body1">
              {offer.type === 'percent' ? t('Global.Label.percent') : t('Global.Label.fixed')}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('Global.Label.value')}
            </Typography>
            <Typography variant="body1">
              {offer.type === 'percent' ? `${(offer.value * 100).toFixed(1)}%` : offer.value}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('Global.Label.offer_quantity')}
            </Typography>
            <Typography variant="body1">{offer.offerQuantity}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('Global.Label.max_per_client')}
            </Typography>
            <Typography variant="body1">{offer.maxPerClient}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('Global.Label.disabled')}
            </Typography>
            <Switch checked={offer.disabled} sx={{ '& input': { cursor: 'default !important' } }} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('Global.Label.employee_read_only')}
            </Typography>
            <Switch
              checked={offer.employeeReadOnly}
              sx={{ '& input': { cursor: 'default !important' } }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
