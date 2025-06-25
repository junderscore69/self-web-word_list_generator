import React, { useCallback } from 'react';
import { 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction,
  IconButton,
  Box,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { UploadedFile } from '../App';

interface FileUploadProps {
  onFileUpload: (files: UploadedFile[]) => void;
  onFileRemove: (fileName: string) => void;
  uploadedFiles: UploadedFile[];
}

const FileUpload = ({ onFileUpload, onFileRemove, uploadedFiles }: FileUploadProps) => {
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    handleFiles(files);
  }, []);

  const handleFiles = async (files: File[]) => {
    const processedFiles: UploadedFile[] = await Promise.all(
      files.map(async (file) => {
        const content = await file.text();
        const wordCount = content.trim().split(/\s+/).length;
        return {
          name: file.name,
          content,
          wordCount,
        };
      })
    );
    onFileUpload(processedFiles);
  };

  return (
    <Paper 
      sx={{ 
        p: 3,
        border: '2px dashed',
        borderColor: 'primary.main',
        backgroundColor: 'background.paper',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: 'primary.dark',
          backgroundColor: 'rgba(99, 102, 241, 0.04)',
        }
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
        <Typography variant="h6" gutterBottom>
          Drag and drop files here
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          or click to select files
        </Typography>
        <input
          type="file"
          multiple
          style={{ display: 'none' }}
          id="file-upload"
          onChange={handleFileInput}
        />
        <label htmlFor="file-upload">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
            sx={{ 
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Select Files
          </Button>
        </label>
      </Box>

      {uploadedFiles.length > 0 && (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Uploaded Files:
          </Typography>
          <List>
            {uploadedFiles.map((file) => (
              <ListItem 
                key={file.name}
                sx={{ 
                  borderRadius: '8px',
                  mb: 1,
                  backgroundColor: 'background.default',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  }
                }}
              >
                <ListItemText
                  primary={file.name}
                  secondary={`${file.wordCount.toLocaleString()} words`}
                />
                <ListItemSecondaryAction>
                  <IconButton 
                    edge="end" 
                    onClick={() => onFileRemove(file.name)}
                    sx={{ 
                      color: 'error.main',
                      '&:hover': {
                        backgroundColor: 'rgba(239, 68, 68, 0.04)',
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  );
};

export default FileUpload; 