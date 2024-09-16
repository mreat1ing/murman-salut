import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';

import './CategoriesList.scss';
import { IStore } from 'src/interfaces/store.interface';
import CategoryCard from 'src/components/CategoryCard';
import CategorySkeleton from 'src/common/categorySkeleton';
import { iconFilter } from 'src/ui/icons/categoryIcons/CategoryIcons';

const CategoriesList: FC = () => {
  const categories = useSelector(
    (state: IStore) => state.storeItemsReducer.categories
  );
  const categoriesLoading = useSelector(
    (state: IStore) => state.storeItemsReducer.isCategoriesLoading
  );

  return (
    <div className="categories-spinner">
      {!categoriesLoading ? (
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
          {/* {categories &&
            categories.map((item) => {
              if (item.title === 'Все')
                return (
                  <li key={item.value}>
                    <Link to={`/store?category=${item.title}`}>
                      <CategoryCard
                        cn={true}
                        title={item.title}
                        value={item.value}
                        image={iconFilter(item.title)}
                        active={false}
                      />
                    </Link>
                  </li>
                );
              else {
                return (
                  <li key={item.value}>
                    <Link to={`/store?category=${item.title}`}>
                      <CategoryCard
                        cn={false}
                        title={item.title}
                        value={item.title}
                        image={iconFilter(item.title)}
                      />
                    </Link>
                  </li>
                );
              }
            })} */}
          {categories &&
            categories.map((el) => (
              <SwiperSlide key={el.title}>
                <Link to={`/store?category=${el.title}`}>
                  <CategoryCard
                    cn={el.title === 'Все'}
                    title={el.title}
                    value={el.title}
                    image={iconFilter(el.title)}
                  />
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      ) : (
        <CategorySkeleton />
      )}
    </div>
  );
};

export default memo(CategoriesList);
