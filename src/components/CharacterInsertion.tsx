import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField,
  FormControlLabel,
  Switch
} from '@mui/material';
import { CombinationSettings } from '../App';

interface CharacterInsertionProps {
  insertCharacter?: string;
  onChange: (insertCharacter?: string) => void;
}

const CharacterInsertion = ({ insertCharacter, onChange }: CharacterInsertionProps) => {
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      onChange(undefined);
    } else {
      onChange('!');
    }
  };

  const handleCharacterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Character Insertion
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={!!insertCharacter}
            onChange={handleToggle}
          />
        }
        label="Enable character insertion"
      />
      
      {insertCharacter !== undefined && (
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Insert Character"
            value={insertCharacter}
            onChange={handleCharacterChange}
            size="small"
            inputProps={{ maxLength: 1 }}
            helperText="This character will be inserted at different positions in the generated words"
          />
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Example: With character "!", "tweosrtd" becomes ["!tweosrtd", "t!weosrtd", "tw!eosrtd"]
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default CharacterInsertion; 