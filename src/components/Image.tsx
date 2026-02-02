import type NextImage from 'next/image';
import type { ComponentProps } from 'react';
import { getImageProps } from 'next/image';

export default function Image(props: ComponentProps<typeof NextImage>) {
  const { props: nextProps } = getImageProps({
    ...props,
  });

  const { style: _omit, alt, ...delegated } = nextProps;

  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} {...delegated} />;
}
