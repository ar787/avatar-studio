export function generateUniqueFileName(
  prefix: string,
  extension: 'png' | 'jpeg',
) {
  const timestamp = Date.now().toString();
  const lastFourDigits = timestamp.slice(-4);
  return `${prefix}-${lastFourDigits}.${extension}`;
}
