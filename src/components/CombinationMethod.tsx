import React from 'react';
import { 
  Paper, 
  Typography, 
  RadioGroup, 
  FormControlLabel, 
  Radio,
  TextField,
  Box,
  FormControl,
  FormLabel,
  Checkbox
} from '@mui/material';
import { CombinationSettings } from '../App';

interface CombinationMethodProps {
  method: CombinationSettings['method'];
  insertCharacter?: string;
  includeOriginal?: boolean;
  onChange: (method: CombinationSettings['method'], insertCharacter?: string, includeOriginal?: boolean) => void;
}

const CombinationMethod = ({ method, insertCharacter, includeOriginal, onChange }: CombinationMethodProps) => {
  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value as CombinationSettings['method']);
  };

  const handleCharacterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange('insert', event.target.value);
  };

  const handleIncludeOriginalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(method, insertCharacter, event.target.checked);
  };

  const isSingleFileMethod = method === 'capitalization' || method === 'insert' || method === 'reverseCaps';

  return (
    <Paper sx={{ p: 3 }}>
      <FormControl component="fieldset" sx={{ width: '100%' }}>
        <FormLabel component="legend">
          <Typography variant="h6" gutterBottom>
            Combination Method
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Choose how you want to combine your words
          </Typography>
        </FormLabel>
        <RadioGroup 
          value={method} 
          onChange={handleMethodChange}
          sx={{ mt: 2 }}
        >
          <FormControlLabel
            value="simple"
            control={<Radio />}
            label={
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Simple Combination</Typography>
                <Typography variant="body2" color="text.secondary">
                  Concatenates words together. Example: "hello" + "world" → "helloworld"
                </Typography>
              </Box>
            }
            sx={{ 
              mb: 2,
              p: 2,
              borderRadius: '8px',
              backgroundColor: method === 'simple' ? 'rgba(99, 102, 241, 0.04)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(99, 102, 241, 0.04)',
              }
            }}
          />
          <FormControlLabel
            value="interweave"
            control={<Radio />}
            label={
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Interweave</Typography>
                <Typography variant="body2" color="text.secondary">
                  Alternates characters from each word. Example: "hello" + "world" → "hweolrldo"
                </Typography>
              </Box>
            }
            sx={{ 
              mb: 2,
              p: 2,
              borderRadius: '8px',
              backgroundColor: method === 'interweave' ? 'rgba(99, 102, 241, 0.04)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(99, 102, 241, 0.04)',
              }
            }}
          />
          <FormControlLabel
            value="capitalization"
            control={<Radio />}
            label={
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Capitalization Variation</Typography>
                <Typography variant="body2" color="text.secondary">
                  Generates variations of each word by capitalizing one letter at a time.
                  Example: "zero" → ["Zero", "zEro", "zeRo", "zerO"]
                </Typography>
              </Box>
            }
            sx={{ 
              mb: 2,
              p: 2,
              borderRadius: '8px',
              backgroundColor: method === 'capitalization' ? 'rgba(99, 102, 241, 0.04)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(99, 102, 241, 0.04)',
              }
            }}
          />
          <FormControlLabel
            value="insert"
            control={<Radio />}
            label={
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Character Insertion</Typography>
                <Typography variant="body2" color="text.secondary">
                  Inserts a character at each position in each word.
                  Example: "zero" with "!" → ["!zero", "z!ero", "ze!ro", "zer!o", "zero!"]
                </Typography>
              </Box>
            }
            sx={{ 
              mb: 2,
              p: 2,
              borderRadius: '8px',
              backgroundColor: method === 'insert' ? 'rgba(99, 102, 241, 0.04)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(99, 102, 241, 0.04)',
              }
            }}
          />
          <FormControlLabel
            value="reverseCaps"
            control={<Radio />}
            label={
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Reverse Caps</Typography>
                <Typography variant="body2" color="text.secondary">
                  Generates variations where caps lock is accidentally on.
                  Example: "hello" → ["HELLO", "hELLO"]
                </Typography>
              </Box>
            }
            sx={{ 
              mb: 2,
              p: 2,
              borderRadius: '8px',
              backgroundColor: method === 'reverseCaps' ? 'rgba(99, 102, 241, 0.04)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(99, 102, 241, 0.04)',
              }
            }}
          />
        </RadioGroup>

        {method === 'insert' && (
          <Box sx={{ mt: 2, ml: 4 }}>
            <TextField
              label="Insert Character"
              value={insertCharacter || ''}
              onChange={handleCharacterChange}
              size="small"
              placeholder="Enter a character to insert"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                }
              }}
            />
          </Box>
        )}

        <Box sx={{ mt: 2, ml: 4 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={includeOriginal || false}
                onChange={handleIncludeOriginalChange}
                sx={{
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                }}
              />
            }
            label={
              <Typography variant="body2">
                Include original words in the output
              </Typography>
            }
          />
        </Box>
      </FormControl>
    </Paper>
  );
};

export default CombinationMethod; 