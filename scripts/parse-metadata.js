/**
 * Скрипт для парсинга метаданных из Markdown файлов
 */

import fs from 'fs';
import path from 'path';

const markdownDir = './src/ux-compass/data/articles';

function parseMarkdownFiles(dir) {
  const articles = [];
  
  function walkDirectory(currentDir) {
    const files = fs.readdirSync(currentDir);
    
    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDirectory(filePath);
      } else if (file.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const relativePath = path.relative(dir, filePath);
        
        // Простая парсинг заголовков и текста
        const lines = content.split('\n');
        const title = lines.find(l => l.startsWith('# '))?.replace('# ', '') || file.replace('.md', '');
        const summary = lines.find(l => l.startsWith('## '))?.replace('## ', '') || '';
        
        articles.push({
          title,
          summary,
          path: relativePath,
          content: content
        });
      }
    }
  }
  
  walkDirectory(dir);
  return articles;
}

export default parseMarkdownFiles;