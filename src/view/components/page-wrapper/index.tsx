import { Box, Container, ContainerProps } from '@mui/material';

import PageHeadding, { PageHeadingProps } from '../headdings/page-headding';

type Props = {
  children: React.ReactNode;
} & ContainerProps &
  PageHeadingProps;

export default function PageWrapper({
  children,
  headding,
  links,
  action,
  ...containerProps
}: Props) {
  return (
    <Container {...containerProps}>
      <PageHeadding headding={headding} links={links} action={action} />
      <Box mt={3}>{children}</Box>
    </Container>
  );
}
