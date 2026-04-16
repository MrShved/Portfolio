import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import methods from '../data/methods';

// Читаем Markdown файлы напрямую через import.meta.url
const articlesDir = new URL('../data/articles/', import.meta.url);

// Функция для чтения Markdown файла
const readMarkdownFile = (filename) => {
  try {
    const response = fetch(new URL(filename, articlesDir).href);
    return response.text();
  } catch (error) {
    console.error('Ошибка при чтении файла:', error);
    return '';
  }
};

// Простой парсер Markdown для рендеринга
const parseMarkdown = (markdown) => {
  if (!markdown) return '<p>Контент не найден</p>';
  
  let html = markdown
    // Заголовки
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    // Жирный и курсив
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/__(.*)__/gim, '<strong>$1</strong>')
    .replace(/_(.*)_/gim, '<em>$1</em>')
    // Списки
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/^\d\.\s(.*$)/gim, '<li>$1</li>')
    // Цитаты
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    // Код
    .replace(/`([^`]+)`/gim, '<code>$1</code>')
    // Горизонтальная линия
    .replace(/^---+$/gim, '<hr />')
    // Перенос строки
    .replace(/\n/gim, '<br />');

  return html;
};

const MethodArticle = () => {
  const { id } = useParams();
  const [method, setMethod] = useState(null);
  const [relatedMethods, setRelatedMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Поиск метода по echelon
    let foundMethod = null;
    
    // Сначала ищем в echelon 1, затем в echelon 2
    foundMethod = methods.find(m => m.id === id && m.echelon === 1);
    if (!foundMethod) {
      foundMethod = methods.find(m => m.id === id && m.echelon === 2);
    }

    if (foundMethod) {
      // Читаем Markdown файл
      const filepath = foundMethod.filepath;
      readMarkdownFile(filepath).then(markdown => {
        const parsedContent = parseMarkdown(markdown);
        setMethod({ ...foundMethod, articleContent: parsedContent });
        loadRelatedMethods(foundMethod.id);
      });
    } else {
      setMethod(null);
    }
    
    setLoading(false);
  }, [id]);

    // Загрузка связанных методов
    const loadRelatedMethods = (currentId) => {
      const allMethods = methods;
      const relatedList = allMethods.filter(
        m => m.id !== currentId && (m.relatedMethods?.includes(currentId) || false)
      ).slice(0, 4);
      setRelatedMethods(relatedList);
    };

  if (loading) {
    return (
      <div className="min-h-screen bg-darkBg text-accent flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent mb-4"></div>
          <p>Загрузка метода...</p>
        </div>
      </div>
    );
  }

  if (!method) {
    return (
      <div className="min-h-screen bg-darkBg text-accent flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent mb-4"></div>
          <p>Метод не найден</p>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-base-100 text-base-content">
        {/* Навигация */}
        <nav className="fixed top-0 left-0 right-0 bg-base-200/90 backdrop-blur-sm z-40 border-b border-base-300">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/research-methods" className="flex items-center space-x-2 text-base-content hover:text-orange-500 transition-colors btn btn-sm btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              <span className="text-sm">Вернуться к списку</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link to="/research-methods" className="btn btn-sm btn-ghost text-base-content hover:text-orange-500">
                ← Все методы
              </Link>
            </div>
          </div>
        </nav>

        {/* Контент */}
        <main className="pt-24 pb-20 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Заголовок */}
            <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
              {method.russianTitle || method.title || 'Название метода'}
            </h1>

            {/* Мета-информация */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-3 py-1 rounded-lg bg-orange-500/10 text-orange-600 text-sm capitalize">
                {method.stage?.join(', ') || '—'}
              </span>
              <span className="px-3 py-1 rounded-lg bg-teal-500/10 text-teal-600 text-sm capitalize">
                {method.type.toUpperCase() || '—'}
              </span>
              <span className="px-3 py-1 rounded-lg bg-base-200 text-base-content text-sm">
                {method.minDays ? `${method.minDays}–${method.maxDays} дн.` : '—'}
              </span>
              <span className="px-3 py-1 rounded-lg bg-orange-500/10 text-orange-600 text-sm capitalize">
                {method.complexity?.toUpperCase().replace(/-/g, ' ') || '—'}
              </span>
            </div>

            {/* Основной контент — рендерим Markdown напрямую */}
            <article className="prose prose-base max-w-none">
              <div
                className="text-base-content leading-relaxed"
                dangerouslySetInnerHTML={{ __html: method.articleContent }}
              />
            </article>

            {/* Связанные методы */}
            {relatedMethods.length > 0 && (
              <section className="mt-16 pt-8 border-t border-base-200">
                <h2 className="text-2xl font-bold text-base-content mb-6">Связанные методы</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedMethods.map((m, index) => (
                    <Link
                      key={index}
                      to={`/method/${m.id}`}
                      className="bg-base-200 rounded-box p-4 hover:bg-base-300 transition-colors"
                    >
                      <h3 className="text-base-content font-medium">{m.russianTitle || m.title || 'Связанный метод'}</h3>
                      <p className="text-base-content text-sm mt-1 line-clamp-2">{m.shortDescription || ''}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
  );
};

export default MethodArticle;