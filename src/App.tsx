import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme, Box, Typography, Paper } from '@mui/material';
import FileUpload from './components/FileUpload';
import CombinationMethod from './components/CombinationMethod';
import Preview from './components/Preview';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#773376', // Sparkling Grape
      light: '#a65e7e', // Red Violet as light
      dark: '#5a255a',  // Darker purple for hover/active
      contrastText: '#fff',
    },
    secondary: {
      main: '#a65e7e', // Red Violet
      light: '#c98fa7',
      dark: '#7a425e',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      background: 'linear-gradient(45deg, #773376 30%, #a65e7e 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '2rem',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 24px',
        },
        contained: {
          background: 'linear-gradient(90deg, #773376 0%, #a65e7e 100%) !important',
          color: '#fff !important',
          boxShadow: 'none',
          border: 'none',
          '&:hover': {
            background: 'linear-gradient(90deg, #5a255a 0%, #7a425e 100%) !important',
            color: '#fff !important',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
          '&:active': {
            background: 'linear-gradient(90deg, #5a255a 0%, #7a425e 100%) !important',
            color: '#fff !important',
          }
        }
      }
    }
  }
});

export interface UploadedFile {
  name: string;
  content: string;
  wordCount: number;
}

export interface CombinationSettings {
  method: 'simple' | 'interweave' | 'capitalization' | 'insert' | 'reverseCaps';
  insertCharacter?: string;
  includeOriginal?: boolean;
}

function App() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [settings, setSettings] = useState<CombinationSettings>({
    method: 'simple',
  });

  const handleFileUpload = (files: UploadedFile[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleFileRemove = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(file => file.name !== fileName));
  };

  const handleSettingsChange = (newSettings: Partial<CombinationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        py: 4
      }}>
        <Container maxWidth="lg">
          <Typography variant="h1" align="center" gutterBottom>
            Word List Generator
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Generate powerful word combinations for your password lists
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FileUpload 
              onFileUpload={handleFileUpload}
              onFileRemove={handleFileRemove}
              uploadedFiles={uploadedFiles}
            />
            <CombinationMethod
              method={settings.method}
              insertCharacter={settings.insertCharacter}
              includeOriginal={settings.includeOriginal}
              onChange={(method, insertCharacter, includeOriginal) => handleSettingsChange({ method, insertCharacter, includeOriginal })}
            />
            <Preview
              uploadedFiles={uploadedFiles}
              settings={settings}
            />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App; 