import { Stack, Typography, Breadcrumbs } from '@mui/material';

import RouterLink from '../router-link';

export interface PageHeadingProps {
  headding: string;
  links?: { label: string; href?: string }[];
  action?: React.ReactNode;
}

export default function PageHeadding({ headding, links = [], action }: PageHeadingProps) {
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        flexWrap="wrap"
      >
        <Typography variant="h2" component="h1">
          {headding}
        </Typography>
        {action}
      </Stack>
      <Breadcrumbs>
        {links.map(({ label, href }) =>
          href ? (
            <RouterLink
              key={label}
              href={href}
              sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              {label}
            </RouterLink>
          ) : (
            <Typography key={label} color="text.primary">
              {label}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </>
  );
}
