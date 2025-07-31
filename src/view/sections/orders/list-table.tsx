'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Chip,
  Avatar,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
} from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { Order } from '@/lib/types/api/orders';
import { useFormat } from '@/lib/hooks/format';
import { Iconify } from '@/view/components/iconify';
import CustomTable from '@/view/components/custom-table/custom-table';

interface Props {
  items: Order[];
  total: number;
}

export default function OrderListTable({ items, total }: Props) {
  const t = useTranslations();
  const router = useRouter();

  const { formatCurrency } = useFormat();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'primary';
      case 'cancelled':
        return 'error';
      case 'delivered':
        return 'success';
      default:
        return 'default';
    }
  };

  const customRender = {
    user: (row: Order) => (
      <ListItem disablePadding>
        <ListItemButton href={paths.users.users.single(row.user?._id)}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary={row.user?.fullName} secondary={row.user?.email} />
        </ListItemButton>
      </ListItem>
    ),
    finalPrice: (row: Order) => formatCurrency(row.finalPrice),
    status: (row: Order) => (
      <Chip
        label={t(`Global.Label.${row.status}`)}
        color={getStatusColor(row.status)}
        size="small"
        sx={{
          borderRadius: 1,
          py: 1.75,
          px: 0.5,
        }}
      />
    ),
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
          onClick: (item) => router.push(paths.users.orders.single(item._id)),
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
  {
    id: 'status',
    label: 'status',
  },
];
