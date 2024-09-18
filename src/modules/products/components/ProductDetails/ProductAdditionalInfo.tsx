interface ProductAdditionalInfoProps {
  categoryName: string;
}

const ProductAdditionalInfo = ({
  categoryName,
}: ProductAdditionalInfoProps) => (
  <div className='flex flex-col space-y-4 mt-8'>
    <div className='flex flex-col space-y-1'>
      <h3 className='font-fredoka text-xl font-medium underline'>Category:</h3>
      <p className='text-neutral-500 font-opensans'>{categoryName || 'N/A'}</p>
    </div>
  </div>
);

export default ProductAdditionalInfo;
