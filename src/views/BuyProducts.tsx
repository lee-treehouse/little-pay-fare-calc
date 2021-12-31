import styles from "./ViewsCommon.module.css";
import buyStyles from "./BuyProducts.module.css";

import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { HeadingLevel2 } from "common/HeadingLevel2";
import { HeadingLevel3 } from "common/HeadingLevel3";
import { ProductCard } from "common/ProductCard";

export const BuyProducts = () => {
  return (
    <>
      <HeadingLevel2 icon={FaMoneyBillWave} headingText="Buy Products" />
      <div className={styles.main}>
        <HeadingLevel3 headingText="So many things to buy" />
        <p>We really like it when you buy stuff from us, we really do!</p>
        <section className={buyStyles.products}>
          <ProductCard iconColor="#cc6633" name="Bronze Ticket" priceInCents={1000} />
          <ProductCard iconColor="silver" name="Silver Ticket" priceInCents={1500} />
          <ProductCard iconColor="gold" name="Gold Ticket" priceInCents={2500} />
        </section>
      </div>
    </>
  );
};
