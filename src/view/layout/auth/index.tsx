import Image from 'next/image';
import { Box, Card, Stack, Container, CardContent } from '@mui/material';

import Logo from '@/view/components/logo';
import { useDir } from '@/lib/hooks/locale-hooks';
import LocalePopover from '@/view/components/popover/locale-popover';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { left, right } = useDir();

  const renderBgImg = (
    <>
      <Box
        sx={{
          position: 'absolute',
          zIndex: -1,
          bottom: '22%',
          [left]: '5%',
          width: 250,
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <Image
          src="/assets/illustrations/plant-1.svg"
          alt="auth-bg"
          width={500}
          height={500}
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
          }}
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          zIndex: -1,
          bottom: { xs: '22%', sm: '25%' },
          [right]: { xs: 'auto', sm: '5%' },
          [left]: { xs: '5%', sm: 'auto' },
          width: 250,
        }}
      >
        <Image
          src="/assets/illustrations/plant-desk.svg"
          alt="auth-bg"
          width={500}
          height={500}
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      </Box>
    </>
  );

  return (
    <Box
      sx={{
        display: 'grid',
        alignItems: 'center',
        minHeight: '100%',
        paddingBlock: { xs: 4, md: 12 },
        position: 'relative',
        isolation: 'isolate',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          backgroundColor: '#ECEEFF',
          clipPath: 'polygon(0 75%, 100% 70%, 100% 100%, 0 100%)',
        },
      }}
    >
      {renderBgImg}

      <Container>
        <Card sx={{ width: 'fit-content', mx: 'auto' }}>
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
              mb={1}
            >
              <Logo full sx={{ width: 'fit-content', maxWidth: 'min(100%, 200px)', mb: -1.5 }} />
              <LocalePopover large />
            </Stack>
            {children}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
