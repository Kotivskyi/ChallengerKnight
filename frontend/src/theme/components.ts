export const components = {
  MuiButtonBase: {
    styleOverrides: {
      root: {
        '&.Mui-disabled': {
          cursor: 'not-allowed !important',
          pointerEvents: 'all !important'
        },
        '&.Mui-disabled:hover': {
          cursor: 'not-allowed !important',
          pointerEvents: 'all !important'
        }
      }
    }
  }
};
