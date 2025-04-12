import { NotFoundException } from '@nestjs/common';

export function ensureFound<T>(
  data: T | null | undefined,
  message = 'Data not found',
): T {
  if (!data || (Array.isArray(data) && data?.length === 0)) {
    throw new NotFoundException(message);
  }
  return data;
}
