'use client';

import { useState } from 'react';
import { CardContent } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Card, Stack, Button } from '@mui/material';

import { CategoryDetails } from '@/lib/types/api/categories';

import CategorySingleDetails from '../single-details';
import SubCategoryListTable from '../../sub-categories/list-table';
import CategoryLinkSubCategoryDialog from '../link-sub-category-dialog';

export default function CategorySingleView({ category }: { category: CategoryDetails }) {
  const t = useTranslations();
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);

  return (
    <Stack spacing={3}>
      <CategorySingleDetails category={category} />

      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="flex-end">
            <Button variant="contained" size="large" onClick={() => setIsLinkDialogOpen(true)}>
              {t('Pages.Categories.link_sub_category')}
            </Button>
          </Stack>
        </CardContent>
        <SubCategoryListTable
          items={category.subcategories}
          total={category.subcategories.length}
          disablePagination
        />
        <CategoryLinkSubCategoryDialog
          open={isLinkDialogOpen}
          onClose={() => setIsLinkDialogOpen(false)}
          categoryId={category._id}
        />
      </Card>
    </Stack>
  );
}
