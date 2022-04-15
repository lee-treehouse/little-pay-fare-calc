import styles from "./ViewsCommon.module.css";
import buyStyles from "./BuyProducts.module.css";
import React, { useEffect } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { HeadingLevel2 } from "common/HeadingLevel2";
import { HeadingLevel3 } from "common/HeadingLevel3";
import { ProductCard } from "common/ProductCard";
import tiny from "@lee-treehouse/tiny-npm-library";

const USE_CHECKOUT = false;

declare global {
  interface Window {
    LittlePay: any;
  }
}

export const BuyProducts = () => {
  const tinyThing = tiny(" let us see if this works");
  console.log(tiny);
  console.log(tinyThing);

  useEffect(() => {
    if (!USE_CHECKOUT) return;

    //the first time this component loads, try to do a checkout in littlepay-dropin-ui div
    const clientToken = "";
    const littlePay = window.LittlePay({
      clientToken: clientToken,
      targetElementId: "Alternative-drop-in",
      options: {
        address: {
          addressLineOne: "10 Downing Street",
          townCity: "London",
          postcode: "SW1A",
          country: "GB",
        },
        theme: {
          btnColor: "#3B4BF3",
          btnTextColor: "white",
          secondaryColor: "green",
        },
      },
    });
    littlePay.makePayment(
      (e: any) => {
        console.log(`<h1>Error</h1><p>Check your console.</p>${e}`);
      },
      (paymentIntentId: any) => {
        console.log(
          `<h1>Success</h1><p>Your LP Drop-in UI is working! Payment Intent ID is ${paymentIntentId}`
        );
      }
    );
    littlePay.makePayment();
  }, []);

  return (
    <>
      <HeadingLevel2 icon={FaMoneyBillWave} headingText="Buy Products" />
      <div className={styles.main}>
        <HeadingLevel3 headingText="So many things to buy" />
        <p>We really like it when you buy stuff from us, we really do!</p>
        <p>But first I'm gonna test my tiny npm package </p>
        <section className={buyStyles.products}>
          <ProductCard iconColor="#cc6633" name="Bronze Ticket" priceInCents={1000} />
          <ProductCard iconColor="silver" name="Silver Ticket" priceInCents={1500} />
          <ProductCard iconColor="gold" name="Gold Ticket" priceInCents={2500} />
        </section>
      </div>
      <div id="Alternative-drop-in"></div>
    </>
  );
};
