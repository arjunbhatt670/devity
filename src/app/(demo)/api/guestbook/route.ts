import type { z } from 'zod';
import { sanitizeHtml } from '@/app/(demo)/api/utils/sanitizeHtml';

import { isXssSafe } from '@/app/(demo)/api/utils/validateXssSafe';
import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';
import { guestbookSchema } from '@/models/Schema';
import {
  DeleteGuestbookValidation,
  EditGuestbookValidation,
  GuestbookValidation,
} from '@/validations/GuestbookValidation';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

type Guestbook = z.infer<typeof GuestbookValidation>;

export const xssAdaptGuestbookData = (data: Guestbook): Guestbook => {
  const { htmlContent, body, username } = data;

  if (!isXssSafe(body)) {
    throw new Error('body contains potentially harmful code');
  }

  if (!isXssSafe(username)) {
    throw new Error('username contains potentially harmful code');
  }

  const sanitizedHtmlContent = sanitizeHtml(htmlContent);

  return {
    body,
    username,
    htmlContent: sanitizedHtmlContent,
  };
};

export const POST = async (request: Request) => {
  const json = await request.json();
  const parse = GuestbookValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  try {
    // const data = parse.data;
    const data = xssAdaptGuestbookData(parse.data);

    const guestbook = await db
      .insert(guestbookSchema)
      .values(data)
      .returning();

    logger.info('A new guestbook has been created');

    return NextResponse.json({
      id: guestbook[0]?.id,
    });
  } catch (error) {
    logger.error(error, 'An error occurred while creating a guestbook');

    return NextResponse.json({}, { status: 500 });
  }
};

export const PUT = async (request: Request) => {
  const json = await request.json();
  const parse = EditGuestbookValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  try {
    // const data = parse.data;
    const data = xssAdaptGuestbookData(parse.data);

    await db
      .update(guestbookSchema)
      .set(data)
      .where(eq(guestbookSchema.id, parse.data.id));

    logger.info('A guestbook entry has been updated');

    return NextResponse.json({});
  } catch (error) {
    logger.error(error, 'An error occurred while updating a guestbook');

    return NextResponse.json({}, { status: 500 });
  }
};

export const DELETE = async (request: Request) => {
  const json = await request.json();
  const parse = DeleteGuestbookValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  try {
    await db
      .delete(guestbookSchema)
      .where(eq(guestbookSchema.id, parse.data.id));

    logger.info('A guestbook entry has been deleted');

    return NextResponse.json({});
  } catch (error) {
    logger.error(error, 'An error occurred while deleting a guestbook');

    return NextResponse.json({}, { status: 500 });
  }
};

export const GET = async () => {
  try {
    const guestbook = await db
      .select()
      .from(guestbookSchema)
      .orderBy(guestbookSchema.createdAt);

    logger.info('Get all guestbook entries');

    return NextResponse.json(guestbook);
  } catch (error) {
    logger.error(error, 'An error occurred while listing guestbook');

    return NextResponse.json({}, { status: 500 });
  }
};
