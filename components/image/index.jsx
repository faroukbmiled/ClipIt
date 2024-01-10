import Image from 'next/image'
import React from 'react';

export default function LazyImage(src, className) {

    return (
        <Image className={className} src={src} width={600} height={600} layout="responsive"
            loading="lazy" />
    );
}

