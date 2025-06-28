import { Grid } from '@mui/material';
import { useTranslations } from 'next-intl';

import { useQueryParams } from '@/lib/hooks/use-query-params';
import BooleanFilter from '@/view/components/custom-fields/boolean-filter';
import DebounceSearchField from '@/view/components/custom-fields/debounce-search-field';
import { CategoriesAutoComplete } from '@/view/components/api-related/auto-complete-modules';

export default function SubCategoryListFilters() {
  const t = useTranslations();
  const {
    values: { categoryId },
    set: setQueryParam,
  } = useQueryParams(['categoryId'], { replace: true });

  return (
    <Grid container columnSpacing={1} rowSpacing={2}>
      <Grid size={{ xs: 12, sm: 3 }}>
        <DebounceSearchField
          name="subCategoryName"
          placeholder={`${t('Global.Label.name_ar')} / ${t('Global.Label.name_en')}`}
          clearOtherParams={['page']}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <CategoriesAutoComplete
          onChange={(category) => setQueryParam({ categoryId: category?._id })}
          defaultValue={categoryId}
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
