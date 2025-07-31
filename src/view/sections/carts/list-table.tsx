'use client';

import { useRouter } from 'next/navigation';
import { Avatar, ListItem, ListItemText, ListItemButton, ListItemAvatar } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { Cart } from '@/lib/types/api/carts';
import { useFormat } from '@/lib/hooks/format';
import { Iconify } from '@/view/components/iconify';
import CustomTable from '@/view/components/custom-table/custom-table';

interface Props {
  items: Cart[];
  total: number;
}

export default function CartListTable({ items, total }: Props) {
  const router = useRouter();

  const { formatCurrency } = useFormat();

  const customRender = {
    user: (row: Cart) => (
      <ListItem disablePadding>
        <ListItemButton href={paths.users.users.single(row.user?._id)}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary={row.user?.fullName} secondary={row.user?.email} />
        </ListItemButton>
      </ListItem>
    ),
    finalPrice: (row: Cart) => formatCurrency(row.finalPrice),
  };

  return (
    <CustomTable
      tableHead={tableHead}
      data={items.map((item) => ({ ...item, id: item._id }))}
      count={total}
      customRender={customRender}
      actions={[
        {
          label: 'Global.Action.view',
          icon: <Iconify icon={Icons.EYE_FILLED} />,
          onClick: (item) => router.push(paths.users.carts.single(item.user._id)),
        },
      ]}
    />
  );
}

const tableHead = [
  {
    id: 'user',
    label: 'user',
  },
  {
    id: 'finalPrice',
    label: 'total_price',
  },
  {
    id: 'productsCount',
    label: 'products_count',
  },
];
