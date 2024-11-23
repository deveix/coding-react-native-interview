import {TMDBConfiguration} from '@features/main/types/config';

export const getImageUrl = (
  config: TMDBConfiguration | null,
  path: string | null,
  size: string = 'original',
): string | null => {
  if (!config || !path) return null;
  return `${config.images.secure_base_url}${size}${path}`;
};
