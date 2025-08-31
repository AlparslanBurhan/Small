'use client';

import Link from 'next/link';
import { CardData } from '@/types/interfaces';
import { FaRegSmile, FaRegClock } from 'react-icons/fa';
import { useEffect, useRef } from 'react';

export default function BlogCard({ carddata }: { carddata: CardData }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const image = entry.target.querySelector<HTMLImageElement>('.card-image');
        const text = entry.target.querySelector<HTMLDivElement>('.card-text');

        if (!image || !text) return;

        const ratio = entry.intersectionRatio;

        image.style.transform = `translateX(${-(100 - ratio * 100)}px)`;
        image.style.opacity = `${ratio}`;

        text.style.transform = `scale(${ratio})`;
        text.style.opacity = `${ratio}`;
      });
    };

    const options = {
      threshold: Array.from({ length: 1000 }, (_, i) => i / 1000),
      rootMargin: "70px"
    };

    const observer = new IntersectionObserver(callback, options);
    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Link
      ref={cardRef}
      href={`/blog/${carddata.id}`}
      className="block border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 overflow-hidden"
    >
      <div className="flex items-center gap-6">
        <div className="flex-1 card-text transition-all duration-300 ease-out">
          <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white hover:text-indigo-600 transition-colors">
            {carddata.baslik}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-5">{carddata.kisa_ozet}</p>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm space-x-6">
            <div className="flex items-center gap-1">
              <FaRegClock className="text-indigo-500" />
              <time dateTime={carddata.yazilma_tarihi} className="whitespace-nowrap">
                {new Date(carddata.yazilma_tarihi).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <FaRegSmile className="text-yellow-400" />
              <span>{carddata.clap_sayisi}</span>
            </div>
          </div>
        </div>
        <img
          src={`/${carddata.id % 10}.jpg`}
          alt="Blog görseli"
          className="w-48 h-24 object-cover rounded-lg shadow-md card-image transition-all duration-300 ease-out"
          loading="eager"
        />
      </div>
    </Link>
  );
}
