import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Theme, SxProps } from '@mui/material/styles';

// ----------------------------------------------------------------------

type Props = {
  notFound: boolean;
  sx?: SxProps<Theme>;
};

export default function TableNoData({ notFound, sx }: Props) {
  return (
    <TableRow>
      {notFound ? (
        <TableCell colSpan={12}>
          {/* <EmptyContent
            filled
            title="No Data"
            sx={{
              py: 10,
              ...sx,
            }}
          /> */}
          no data
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
