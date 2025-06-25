import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Switch
} from '@mui/material';
import { UploadedFile } from '../App';

interface OutputSettingsProps {
  outputDirectory?: string;
  onChange: (outputDirectory?: string) => void;
}

const OutputSettings = ({ outputDirectory, onChange }: OutputSettingsProps) => {
  const handleDirectorySelect = async () => {
    try {
      // Note: This is a placeholder for the File System Access API
      // In a real implementation, we would use the showDirectoryPicker() API
      // For now, we'll just use a text input
      const directory = prompt('Enter output directory path:');
      if (directory) {
        onChange(directory);
      }
    } catch (error) {
      console.error('Error selecting directory:', error);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Output Settings
      </Typography>
      
      <FormControl component="fieldset">
        <FormLabel component="legend">Output Configuration</FormLabel>
        <FormGroup>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Output Directory"
              value={outputDirectory || ''}
              InputProps={{
                readOnly: true,
              }}
              helperText="Directory where generated word lists will be saved"
            />
            <Button
              variant="contained"
              onClick={handleDirectorySelect}
              sx={{ mt: 1 }}
            >
              Select Directory
            </Button>
          </Box>
          
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Split output into files of 1,000,000 words each"
          />
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Note: Generated word lists will be automatically split into files of 1,000,000 words each
            for better manageability. Each file will be named with a sequential number.
          </Typography>
        </FormGroup>
      </FormControl>
    </Paper>
  );
};

export default OutputSettings; 