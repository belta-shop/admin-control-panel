import { ListItem, ListItemText, ListItemAvatar, ListItemButton } from '@mui/material';

import { useLocaleNameKey } from '@/lib/utils/locale';

import CustomImage from '../image/custom-image';

export default function ApiListItem({
  cover,
  href,
  ...name
}: {
  cover: string;
  href?: string;
  nameAr: string;
  nameEn: string;
}) {
  const { current: currentNameKey, other: otherNameKey } = useLocaleNameKey();
  const content = (
    <>
      <ListItemAvatar>
        <CustomImage src={cover} />
      </ListItemAvatar>
      <ListItemText primary={name[currentNameKey]} secondary={name[otherNameKey]} />
    </>
  );

  return (
    <ListItem disablePadding>
      {href ? (
        <ListItemButton sx={{ borderRadius: 1 }} href={href}>
          {content}
        </ListItemButton>
      ) : (
        content
      )}
    </ListItem>
  );
}
