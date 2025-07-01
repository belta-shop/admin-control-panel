import { useTranslations } from 'next-intl';
import { Chip, ChipProps } from '@mui/material';

export default function StatusChip({ value, sx, ...props }: { value: boolean } & ChipProps) {
  const t = useTranslations('Global.Label');
  return (
    <Chip
      label={value ? t('enabled') : t('disabled')}
      color={value ? 'success' : 'error'}
      size="small"
      sx={{ ...sx, borderRadius: '8px', py: 1.75, px: 0.5 }}
      {...props}
    />
  );
}
