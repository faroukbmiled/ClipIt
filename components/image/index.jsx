import Image from 'next/image';
import React from 'react';

export default function LazyImage({ src, className, width = 600, height = 600 }) {
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
