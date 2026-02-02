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

export type XssValidationResult = {
  isSafe: boolean;
  originalContent: string;
  sanitizedContent: string;
  message: string;
  detectedThreats?: string[];
};

/**
 * Validates if a string is XSS safe by comparing it with its sanitized version
 * @param content - The string content to validate
 * @param options - Optional configuration for DOMPurify
 * @param options.allowedTags - Array of allowed HTML tags
 * @param options.allowedAttributes - Array of allowed HTML attributes
 * @returns XssValidationResult object with validation details
 */
export const validateXssSafe = (
  content: string,
  options?: {
    allowedTags?: string[];
    allowedAttributes?: string[];
  },
): XssValidationResult => {
  try {
    if (!content || typeof content !== 'string') {
      return {
        isSafe: true,
        originalContent: content,
        sanitizedContent: content,
        message: 'Empty or non-string content is considered safe',
      };
    }

    const DOMPurify = getDOMPurifyInstance();

    // Configure DOMPurify if custom options are provided
    const config: any = {};
    if (options?.allowedTags) {
      config.ALLOWED_TAGS = options.allowedTags;
    }
    if (options?.allowedAttributes) {
      config.ALLOWED_ATTR = options.allowedAttributes;
    }

    // Sanitize the content
    const sanitized = DOMPurify.sanitize(content, config);

    // Convert TrustedHTML to string and normalize whitespace for comparison
    const sanitizedString = String(sanitized);
    const normalizedOriginal = content.trim();
    const normalizedSanitized = sanitizedString.trim();

    // Check if content was modified during sanitization
    const isSafe = normalizedOriginal === normalizedSanitized;

    // Detect potential threats
    const detectedThreats: string[] = [];
    if (!isSafe) {
      if (/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i.test(content)) {
        detectedThreats.push('script tags');
      }
      if (/on\w+\s*=\s*["'][^"']*["']/i.test(content)) {
        detectedThreats.push('inline event handlers');
      }
      if (/javascript:/i.test(content)) {
        detectedThreats.push('javascript: protocol');
      }
      if (/<iframe\b/i.test(content)) {
        detectedThreats.push('iframe tags');
      }
      if (/<object\b/i.test(content)) {
        detectedThreats.push('object tags');
      }
      if (/<embed\b/i.test(content)) {
        detectedThreats.push('embed tags');
      }
    }

    return {
      isSafe,
      originalContent: content,
      sanitizedContent: sanitizedString,
      message: isSafe
        ? 'Content is XSS safe'
        : 'Content contains potentially harmful code that was sanitized',
      ...(detectedThreats.length > 0 && { detectedThreats }),
    };
  } catch (error) {
    logger.error(error, 'Failed to validate XSS safety');

    return {
      isSafe: false,
      originalContent: content,
      sanitizedContent: '',
      message: 'Validation failed due to an error',
    };
  }
};

/**
 * Simple boolean check if a string is XSS safe
 * @param content - The string content to validate
 * @returns boolean indicating if content is safe
 */
export const isXssSafe = (content: string): boolean => {
  return validateXssSafe(content).isSafe;
};
