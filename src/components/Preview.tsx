import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
  Alert,
  Stack,
  Divider
} from '@mui/material';
import { UploadedFile, CombinationSettings } from '../App';
import { generatePreview, estimateTotalCombinations } from '../utils/wordCombination';
import { saveWordList } from '../utils/fileHandling';

interface PreviewProps {
  uploadedFiles: UploadedFile[];
  settings: CombinationSettings;
}

const Preview = ({ uploadedFiles, settings }: PreviewProps) => {
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleGenerateFullList = async () => {
    if (uploadedFiles.length < 2 && settings.method !== 'capitalization' && settings.method !== 'insert' && settings.method !== 'reverseCaps') {
      setError('Please upload at least 2 files to generate combinations');
      return;
    }

    if ((settings.method === 'capitalization' || settings.method === 'insert' || settings.method === 'reverseCaps') && uploadedFiles.length === 0) {
      setError('Please upload at least 1 file for this method');
      return;
    }

    if (settings.method === 'insert' && !settings.insertCharacter) {
      setError('Please enter a character to insert');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      let result: string[] = [];

      if (settings.method === 'capitalization') {
        // Get all words from the first file
        const words = uploadedFiles[0].content.split('\n').map(word => word.trim()).filter(word => word.length > 0);
        
        // Generate capitalization variations for each word
        const variations = words.flatMap(word => {
          const vars = Array.from({ length: word.length }, (_, i) => 
            word.slice(0, i) + word[i].toUpperCase() + word.slice(i + 1)
          );
          return settings.includeOriginal ? [word, ...vars] : vars;
        });
        result = settings.includeOriginal ? 
          [...words, ...variations.filter(v => !words.includes(v))] : 
          variations;
      } else if (settings.method === 'insert') {
        // Get all words from the first file
        const words = uploadedFiles[0].content.split('\n').map(word => word.trim()).filter(word => word.length > 0);
        
        // Generate insert variations for each word
        const variations = words.flatMap(word => {
          const vars = Array.from({ length: word.length + 1 }, (_, i) => 
            word.slice(0, i) + settings.insertCharacter + word.slice(i)
          );
          return settings.includeOriginal ? [word, ...vars] : vars;
        });
        result = settings.includeOriginal ? 
          [...words, ...variations.filter(v => !words.includes(v))] : 
          variations;
      } else if (settings.method === 'reverseCaps') {
        // Get all words from the first file
        const words = uploadedFiles[0].content.split('\n').map(word => word.trim()).filter(word => word.length > 0);
        
        // Generate reverse caps variations for each word
        const variations = words.flatMap(word => {
          const inverted = word.split('').map(char => 
            char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
          ).join('');
          return settings.includeOriginal ? [word, inverted] : [inverted];
        });
        result = settings.includeOriginal ? 
          [...words, ...variations.filter(v => !words.includes(v))] : 
          variations;
      } else {
        // Get all words from each file
        const allWords = uploadedFiles.map(file => 
          file.content.split('\n').map(word => word.trim()).filter(word => word.length > 0)
        );

        // For each word in the first file
        for (let i = 0; i < allWords[0].length; i++) {
          // For each word in the second file
          for (let j = 0; j < allWords[1].length; j++) {
            const wordsToCombine = [allWords[0][i], allWords[1][j]];
            
            if (settings.method === 'simple') {
              // Simple combination: concatenate words
              const combined = wordsToCombine.join('');
              if (settings.includeOriginal) {
                result.push(allWords[0][i], allWords[1][j]);
              }
              result.push(combined);
            } else {
              // Interweave combination: alternate characters
              const chars: string[] = [];
              const maxLength = Math.max(...wordsToCombine.map(w => w.length));
              for (let k = 0; k < maxLength; k++) {
                for (const word of wordsToCombine) {
                  if (k < word.length) {
                    chars.push(word[k]);
                  }
                }
              }
              const combined = chars.join('');
              if (settings.includeOriginal) {
                result.push(allWords[0][i], allWords[1][j]);
              }
              result.push(combined);
            }
          }
        }
      }

      // Remove any empty lines and trim each word
      result = result.map(word => word.trim()).filter(word => word.length > 0);

      // Save the word list to downloads
      await saveWordList(result);
      setError(null);
    } catch (err) {
      setError('Error generating word list: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsSaving(false);
    }
  };

  const totalCombinations = estimateTotalCombinations(uploadedFiles, settings);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Generate Word List
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateFullList}
        disabled={isSaving || (uploadedFiles.length < 2 && settings.method !== 'capitalization' && settings.method !== 'insert' && settings.method !== 'reverseCaps')}
        sx={{ 
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          width: '100%',
          py: 2,
        }}
      >
        {isSaving ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            Generating Word List...
          </>
        ) : (
          `Generate ${totalCombinations > 0 ? totalCombinations.toLocaleString() : ''} Words`
        )}
      </Button>
    </Paper>
  );
};

export default Preview; 