import Image from 'next/image';
import React from 'react';

export default function LazyImage({ src, className, width = 0, height = 0 }) {
  return (
    <div className={className}>
      <Image
        src={src}
        width={width}
        height={height}
        layout="responsive"
        loading="lazy"
      />
    </div>
  );
}
