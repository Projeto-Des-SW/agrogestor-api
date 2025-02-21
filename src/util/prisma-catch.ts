import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function prismaCatch<T, E extends Error>(
  callback: () => T,
  errors?: { [key: string]: E },
) {
  try {
    return await callback();
  } catch (error) {
    const errorCode: string | undefined = (
      error as PrismaClientKnownRequestError
    ).code;
    if (errors && errorCode) throw errors[errorCode];
    throw error;
  }
}
