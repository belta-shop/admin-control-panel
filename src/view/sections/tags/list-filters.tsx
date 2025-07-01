import { Grid } from '@mui/material';
import { useTranslations } from 'next-intl';

import StatusFilter from '@/view/components/custom-fields/status-filter';
import BooleanFilter from '@/view/components/custom-fields/boolean-filter';
import DebounceSearchField from '@/view/components/custom-fields/debounce-search-field';

export default function TagListFilters() {
  const t = useTranslations();

  return (
    <Grid container columnSpacing={1} rowSpacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <DebounceSearchField
          name="tagName"
          placeholder={`${t('Global.Label.name_ar')} / ${t('Global.Label.name_en')}`}
          clearOtherParams={['page']}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <StatusFilter
          name="disabled"
          label={t('Global.Label.status')}
          clearOtherParams={['page']}
          fullWidth
          reverse
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
