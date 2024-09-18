import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
}

const RatingStars = ({ rating, maxRating = 5 }: RatingStarsProps) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <Star
          key={i}
          className='h-5 w-5 text-gray-400'
          fill='none'
          strokeWidth={1.5}
        />
      );
    }
    return stars;
  };

  return (
    <div className='flex items-center'>
      {renderStars()}
      <span className='ml-2 text-neutral-500'>(0 reviews)</span>
    </div>
  );
};

export default RatingStars;
