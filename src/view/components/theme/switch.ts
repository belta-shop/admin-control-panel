import { Theme, Components } from '@mui/material';

export function switchComponent(theme: Theme): { MuiSwitch: Components['MuiSwitch'] } {
  const getColor = (color: string) => {
    if (['primary', 'secondary', 'error', 'warning', 'info', 'success'].includes(color)) {
      return theme.palette[color as 'primary'].main;
    }
    if (color === 'default') {
      return theme.palette.text.primary;
    }
    return color;
  };

  return {
    MuiSwitch: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          const height = ownerState.size === 'small' ? 20 : 26;
          const width = 42;

          return {
            width: width,
            height: height,
            padding: 0,
            '& .MuiSwitch-switchBase': {
              padding: 0,
              margin: 2,
              transitionDuration: '300ms',
              '&.Mui-checked': {
                transform: `translateX(${width - height}px)`,
                color: '#fff',
                '& + .MuiSwitch-track': {
                  backgroundColor: getColor(ownerState.color || 'default'),
                  opacity: 1,
                  border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                  opacity: 0.5,
                },
              },
              '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: getColor(ownerState.color || 'default'),
                border: '6px solid #fff',
              },
              '&.Mui-disabled .MuiSwitch-thumb': {
                color: theme.palette.grey[100],
                ...theme.applyStyles('dark', {
                  color: theme.palette.grey[600],
                }),
              },
              '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.7,
                ...theme.applyStyles('dark', {
                  opacity: 0.3,
                }),
              },
            },
            '& .MuiSwitch-thumb': {
              boxSizing: 'border-box',
              width: height - 4,
              height: height - 4,
            },
            '& .MuiSwitch-track': {
              borderRadius: 26 / 2,
              backgroundColor: theme.palette.divider,
              opacity: 1,
              transition: theme.transitions.create(['background-color'], {
                duration: 500,
              }),
            },
          };
        },
      },
    },
  };
}
