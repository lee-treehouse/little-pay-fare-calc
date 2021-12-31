import React from "react";
import { FaTicketAlt } from "react-icons/fa";
import styles from "./ProductCard.module.css";

interface Props {
  name?: string;
  iconColor?: string;
  priceInCents?: number;
}
export const ProductCard: React.FunctionComponent<Props> = ({
  name = "Gold Ticket",
  iconColor = "gold",
  priceInCents = 5000,
}) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <FaTicketAlt size="100px" color={iconColor}></FaTicketAlt>
      </div>
      <div className={styles.productInfo}>
        <h5>{name}</h5>
        <h6>{priceInCents}</h6>
      </div>
    </div>
  );
};
