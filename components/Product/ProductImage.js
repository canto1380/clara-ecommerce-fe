import CarouselImg from 'components/Modals/PreviewFootwear/CarouselImg';
import React, {useState, useEffect} from 'react';
import { Spinner } from 'react-bootstrap';

const ProductImage = ({data}) => {
    const [footData, setFootData] = useState();
  useEffect(() => {
    setFootData(data[0]);
  }, []);
    return (
        <div className='text-center'>
          {footData?.photos ? (
            <CarouselImg photos={footData?.photos} />
          ): (
          <>
          <Spinner
            as="span"
            animation="border"
            size="xl"
            role="status"
            aria-hidden="true"
          />
          </>
    )}
    </div>
    )
};

export default ProductImage;