'use client';

import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Card, Stack, Button, Tooltip, Typography, CardContent } from '@mui/material';

import { Iconify } from '@/view/components/iconify';

export interface DetailsField {
  label: string;
  value: ReactNode;
}

export interface DetailsAction {
  label: string;
  icon: string;
  onClick: () => void;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  loading?: boolean;
}

interface DetailsCardProps {
  fields: DetailsField[];
  actions?: DetailsAction[];
  children?: ReactNode;
  showActions?: boolean;
  disableTranslateFields?: boolean;
  disableTranslateActions?: boolean;
}

export default function DetailsCard({
  fields,
  actions = [],
  children,
  showActions = true,
  disableTranslateFields = false,
  disableTranslateActions = false,
}: DetailsCardProps) {
  const t = useTranslations();

  const renderFields = (
    <Stack spacing={2}>
      {fields.map((field) => (
        <Stack direction="row" spacing={1} key={field.label} alignItems="center" flexWrap="wrap">
          <Typography variant="h6" component="span">
            {disableTranslateFields ? field.label : t(field.label)}:
          </Typography>
          <Typography variant="h6" color="text.secondary" component="span">
            {field.value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );

  const renderActions = (
    <Stack
      direction={{ xs: 'row', sm: 'column' }}
      spacing={2}
      marginInlineStart={{ sm: 'auto' }}
      flexWrap="wrap"
    >
      {actions.map((action) => (
        <Tooltip
          key={action.label}
          title={disableTranslateActions ? action.label : t(action.label)}
        >
          <Button
            color={action.color as 'primary'}
            variant="outlined"
            onClick={action.onClick}
            sx={{ p: 1, minWidth: 0, borderRadius: 1000 }}
            loading={action.loading}
          >
            <Iconify icon={action.icon} fontSize={24} />
          </Button>
        </Tooltip>
      ))}
    </Stack>
  );

  return (
    <Card>
      <CardContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="start" spacing={3}>
          {children}
          {renderFields}
          {showActions && actions.length > 0 && renderActions}
        </Stack>
      </CardContent>
    </Card>
  );
}
