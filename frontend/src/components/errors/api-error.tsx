import { Box } from '@mui/material';

export const ApiError = ({ messages }: { messages: string[] }) => {
  if (messages.length <= 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 2, color: 'red', fontSize: '15px' }}>
      <ul>
        {messages.map((msg) => (
          <li key={msg}>{msg}</li>
        ))}
      </ul>
    </Box>
  );
};
