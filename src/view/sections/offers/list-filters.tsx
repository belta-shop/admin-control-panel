'use client';

import { Grid } from '@mui/material';
import { useTranslations } from 'next-intl';

import BooleanFilter from '@/view/components/custom-fields/boolean-filter';
import DebounceSearchField from '@/view/components/custom-fields/debounce-search-field';

export default function OfferListFilters() {
  const t = useTranslations();

  return (
    <Grid container columnSpacing={1} rowSpacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <DebounceSearchField
          name="offerName"
          placeholder={`${t('Global.Label.name_ar')} / ${t('Global.Label.name_en')}`}
          clearOtherParams={['page']}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <BooleanFilter
          name="disabled"
          label={t('Global.Label.disabled')}
          clearOtherParams={['page']}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <BooleanFilter
          name="employeeReadOnly"
          label={t('Global.Label.employee_read_only')}
          clearOtherParams={['page']}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}
