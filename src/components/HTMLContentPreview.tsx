import type { GuestbookValidation } from '@/validations/GuestbookValidation';
import type { z } from 'zod';
import DOMPurify from 'dompurify';
import { useFormContext } from 'react-hook-form';

export const HTMLContentPreview = () => {
  const { watch } = useFormContext<z.infer<typeof GuestbookValidation>>();
  const htmlContent = watch('htmlContent');

  return (
    <div className="p-2 border border-gray-200 rounded-md min-h-20">
      <div
        dangerouslySetInnerHTML={
          {
            __html: DOMPurify.sanitize(htmlContent),
            // __html: htmlContent,
          }
        }
      />
    </div>
  );
};
