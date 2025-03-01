interface ProductImageProps {
  imageUrl?: string;
  title: string;
}

const ProductImage = ({ imageUrl, title }: ProductImageProps) => {
  const imageSrc = imageUrl
    ? `https://romankuzero-ecommerce-api-2024.azurewebsites.net/${imageUrl}`
    : '/placeholder-image.png';

  return (
    <div className='w-full lg:w-5/12 aspect-[1/1] relative'>
      <img
        src={imageSrc}
        alt={title}
        className='absolute inset-0 w-full h-full object-cover bg-neutral-200 sm:rounded-md'
      />
    </div>
  );
};

export default ProductImage;
