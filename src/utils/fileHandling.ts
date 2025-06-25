import { UploadedFile } from '../App';

const WORDS_PER_FILE = 1_000_000;

export async function saveWordList(words: string[]): Promise<void> {
  // Create a blob with the words, one per line
  const content = words.join('\n');
  const blob = new Blob([content], { type: 'text/plain' });
  
  // Create a download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `wordlist_${Date.now()}.txt`;
  
  // Trigger the download
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function validateFiles(files: UploadedFile[]): string | null {
  if (files.length < 2) {
    return 'Please upload at least 2 files to generate combinations';
  }

  for (const file of files) {
    if (!file.content.trim()) {
      return `File "${file.name}" is empty`;
    }
  }

  return null;
}

export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

export function estimateProcessingTime(
  totalCombinations: number,
  wordsPerFile: number = WORDS_PER_FILE
): string {
  // Rough estimate: 1 million combinations per second
  const seconds = totalCombinations / 1_000_000;
  const minutes = seconds / 60;
  const hours = minutes / 60;

  if (hours >= 1) {
    return `${hours.toFixed(1)} hours`;
  } else if (minutes >= 1) {
    return `${minutes.toFixed(1)} minutes`;
  } else {
    return `${seconds.toFixed(1)} seconds`;
  }
} 