import { useTranslations } from 'next-intl';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { Icons } from '@/lib/config/icons';

import SimplePlaceholder from '../placeholder/simple';

// ----------------------------------------------------------------------

type Props = {
  notFound: boolean;
};

export default function TableNoData({ notFound }: Props) {
  const t = useTranslations();

  return (
    <TableRow>
      {notFound ? (
        <TableCell colSpan={12}>
          <SimplePlaceholder
            icon={Icons.SAD}
            text={t('Global.Helper.no_data')}
            sx={{
              py: 3,
              color: 'text.secondary',
            }}
          />
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
