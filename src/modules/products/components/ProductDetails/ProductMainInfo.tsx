import RatingStars from './RatingStars';

interface ProductMainInfoProps {
  title: string;
  rating: number;
  price: number;
  description: string;
}

const ProductMainInfo = ({
  title,
  rating,
  price,
  description,
}: ProductMainInfoProps) => (
  <div className='flex flex-col space-y-4'>
    <div className='flex flex-col'>
      <h2 className='font-opensans text-3xl font-bold mb-1'>{title}</h2>
      <RatingStars rating={rating} />
    </div>

    <div className='flex flex-row items-center space-x-2'>
      <p className='font-opensans text-3xl text-amber-500 font-bold'>
        €{price.toFixed(2)}
      </p>
    </div>

    <p className='text-neutral-500 font-opensans font-normal leading-snug'>
      {description}
    </p>

    <hr />
  </div>
);

export default ProductMainInfo;
