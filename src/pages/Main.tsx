import React, { useEffect, useState } from 'react';
import styles from '../assets/css/Main.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RePrice } from '../util/RePrice';
import { IProductInfos } from '../util/db';

const Main = () => {
  const [productList, setProductList] = useState<IProductInfos>();

  useEffect(() => {
    axios
      .get('http://3.39.198.214:8080/products')
      .then(res => {
        setProductList(res.data.products);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.product_title}>#NEW</div>
          <div className={styles.product}>
            {productList &&
              productList?.map((data, index) => {
                return (
                  <div className={styles.product_item} key={data?.id}>
                    <Link to={`/product/${data.id}`}>
                      <div className={styles.imgBox}>
                        {data.image_urls &&
                          data.image_urls.map((imgUrls, index) => {
                            return (
                              <img
                                src={`${imgUrls}`}
                                alt={`${imgUrls}`}
                                key={index}
                              />
                            );
                          })}
                      </div>
                      <div className={styles.itemInfo}>
                        <div className={styles.brandName}>
                          {data.brand.name} {data.category.name}
                        </div>
                        <div className={styles.fullName}>{data.name}</div>
                        <div className={styles.price}>
                          월 {RePrice(data.price / 60)}원
                          <span className={styles.mPrice}>(60개월 기준)</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
