import { UploadedFile, CombinationSettings } from '../App';

export function combineWordsSimple(words: string[]): string[] {
  if (words.length < 2) return words;
  
  // Simply concatenate all words together
  return [words.join('')];
}

export function combineWordsInterweave(words: string[]): string[] {
  if (words.length < 2) return words;
  
  const result: string[] = [];
  const maxLength = Math.max(...words.map(w => w.length));
  
  for (let i = 0; i < maxLength; i++) {
    for (const word of words) {
      if (i < word.length) {
        result.push(word[i]);
      }
    }
  }
  
  return [result.join('')];
}

export function insertCharacter(word: string, char: string): string[] {
  const result: string[] = [];
  for (let i = 0; i <= word.length; i++) {
    result.push(word.slice(0, i) + char + word.slice(i));
  }
  return result;
}

export function generatePreview(
  files: UploadedFile[],
  settings: CombinationSettings
): string[] {
  if (files.length < 2 && settings.method !== 'capitalization') return [];
  if (settings.method === 'capitalization' && files.length === 0) return [];
  
  if (settings.method === 'capitalization') {
    // Get first few words from the first file for preview
    const words = files[0].content.trim().split(/\s+/).slice(0, 2);
    
    // Generate capitalization variations for each word
    return words.flatMap(word => 
      Array.from({ length: word.length }, (_, i) => 
        word.slice(0, i) + word[i].toUpperCase() + word.slice(i + 1)
      )
    );
  }
  
  // Get first few words from each file for preview
  const previewWords = files.map(file => {
    const words = file.content.trim().split(/\s+/);
    return words.slice(0, 2); // Get first 2 words for preview
  });
  
  let result: string[] = [];
  
  // Generate combinations for preview words
  for (let i = 0; i < previewWords[0].length; i++) {
    for (let j = 0; j < previewWords[1].length; j++) {
      const wordsToCombine = [previewWords[0][i], previewWords[1][j]];
      
      if (settings.method === 'simple') {
        result.push(wordsToCombine.join(''));
      } else {
        result.push(combineWordsInterweave(wordsToCombine)[0]);
      }
    }
  }
  
  // Apply character insertion if enabled
  if (settings.insertCharacter) {
    result = result.flatMap(word => 
      insertCharacter(word, settings.insertCharacter!)
    );
  }
  
  return result;
}

export function estimateTotalCombinations(
  files: UploadedFile[],
  settings: CombinationSettings
): number {
  if (files.length < 2 && settings.method !== 'capitalization' && settings.method !== 'insert' && settings.method !== 'reverseCaps') return 0;
  if ((settings.method === 'capitalization' || settings.method === 'insert' || settings.method === 'reverseCaps') && files.length === 0) return 0;
  
  if (settings.method === 'capitalization') {
    // For capitalization, each word generates variations equal to its length
    const words = files[0].content.split('\n').filter(word => word.trim());
    const variations = words.reduce((sum, word) => sum + word.length, 0);
    return settings.includeOriginal ? variations + words.length : variations;
  }
  
  if (settings.method === 'insert') {
    // For insert, each word generates variations equal to its length + 1
    const words = files[0].content.split('\n').filter(word => word.trim());
    const variations = words.reduce((sum, word) => sum + (word.length + 1), 0);
    return settings.includeOriginal ? variations + words.length : variations;
  }

  if (settings.method === 'reverseCaps') {
    // For reverse caps, each word generates 1 variation
    const words = files[0].content.split('\n').filter(word => word.trim());
    return settings.includeOriginal ? words.length * 2 : words.length;
  }
  
  // For simple and interweave methods
  const wordCounts = files.map(file => 
    file.content.split('\n').filter(word => word.trim()).length
  );
  const combinations = wordCounts[0] * wordCounts[1];
  return settings.includeOriginal ? combinations + wordCounts[0] + wordCounts[1] : combinations;
} 