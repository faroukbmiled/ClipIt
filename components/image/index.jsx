import Image from 'next/image';
import React from 'react';

export default function LazyImage({ src, className, width = 0, height = 0 }) {
  const isExternal = src.startsWith('https://') || src.startsWith('http://');
  const modifiedSrc = isExternal ? src : `https://clip-it.cloud${src}`;

  return (
    <div className={className}>
      <Image
        src={modifiedSrc}
        width={width}
        height={height}
        layout="responsive"
        loading="lazy"
      />
    </div>
  );
}
