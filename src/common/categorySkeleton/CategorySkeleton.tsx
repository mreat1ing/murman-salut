import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid } from 'swiper/modules';

import CategoryCard from 'src/components/CategoryCard';
import { CATEGORIES_COUNT } from 'src/constants/categories';

const CategorySkeleton: FC = () => {
  const categories = [];
  for (let i = 0; i < CATEGORIES_COUNT; i++) {
    categories.push(
      <SwiperSlide key={i}>
        <CategoryCard cn={false} />
      </SwiperSlide>
    );
  }

  // return <ul className="store-page__categories">{categories}</ul>;
  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={30}
      // pagination={{
      //   clickable: true,
      // }}
      grid={{ rows: 2 }}
      navigation={true}
      modules={[Navigation, Grid]}
      className="store-page__categories--swiper"
    >
      {categories}
    </Swiper>
  );
};

export default CategorySkeleton;
