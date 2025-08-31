import BlogCard from './BlogCard';
import { CardData } from '@/types/interfaces';

export default function CardList({ carddatas }:  { carddatas: CardData[] }) {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 gap-4 p-4">
      {carddatas.map((carddata) => (
        <BlogCard key={carddata.id} carddata={carddata} />
      ))}
    </div>
  );
}
