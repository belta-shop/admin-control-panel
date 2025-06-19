import { Grid } from '@mui/material';
import { useTranslations } from 'next-intl';

import BooleanFilter from '@/view/components/custom-fields/boolean-filter';
import DebounceSearchField from '@/view/components/custom-fields/debounce-search-field';

export default function CategoryListFilters() {
  const t = useTranslations();

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <DebounceSearchField name="category" clearOtherParams={['page']} fullWidth />
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <BooleanFilter name="disabled" label={t('Global.Label.disabled')} />
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <BooleanFilter name="employeeReadOnly" label={t('Global.Label.employee_read_only')} />
      </Grid>
    </Grid>
  );
}
