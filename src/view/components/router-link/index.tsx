import { Link, LinkProps } from '@mui/material';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

export default function RouterLink(props: NextLinkProps & LinkProps) {
  return <Link component={NextLink} {...props} />;
}
