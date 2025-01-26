import { z } from 'zod';
import type { NextApiRequest, NextApiResponse } from 'next';
// i18n
import { defineI18n } from '@/i18n/i18n';
// helpers
import { responseHelper } from './response.helper';

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<any>;

const i18n = defineI18n('api');

export function apiHandler(handler: Handler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method;
    try {
      const response = await handler(req, res);
      if (method === 'POST') {
        return responseHelper.success.post(response);
      } else if (method === 'GET') {
        if (!response) return responseHelper.error.notFound(null, i18n('notFound'));
        return responseHelper.success.get(response);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return responseHelper.error.validation(error.errors, i18n('invalidParams'));
      } else {
        return responseHelper.error.server(error, i18n('serverError'));
      }
    }
  };
}