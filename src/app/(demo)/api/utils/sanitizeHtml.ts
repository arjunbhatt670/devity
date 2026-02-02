import { logger } from '@/libs/Logger';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

let DOMPurifyInstance: ReturnType<typeof createDOMPurify> | null = null;

const getDOMPurifyInstance = () => {
  if (!DOMPurifyInstance) {
    const window = new JSDOM('').window;
    DOMPurifyInstance = createDOMPurify(window);
  }
  return DOMPurifyInstance;
};

export const sanitizeHtml = (htmlContent: string): string => {
  try {
    const DOMPurify = getDOMPurifyInstance();
    const sanitized = DOMPurify.sanitize(htmlContent);

    return sanitized;
  } catch (error) {
    logger.error(error, 'Failed to sanitize HTML content');

    return '';
  }
};
