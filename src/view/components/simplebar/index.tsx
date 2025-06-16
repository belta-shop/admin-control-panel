import { Box } from '@mui/material';

import SimplebarWrapper, { SimplebarWrapperProps } from './wrapper';

export default function Simplebar(props: SimplebarWrapperProps) {
  const { children, sx, ...other } = props;

  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (mobile) {
    return (
      <Box sx={{ overflow: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return <SimplebarWrapper {...props} />;
}
