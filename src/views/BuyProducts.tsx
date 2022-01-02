import styles from "./ViewsCommon.module.css";
import buyStyles from "./BuyProducts.module.css";

import React, { useEffect } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { HeadingLevel2 } from "common/HeadingLevel2";
import { HeadingLevel3 } from "common/HeadingLevel3";
import { ProductCard } from "common/ProductCard";
import tiny from "@lee-treehouse/tiny-npm-library";

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
    //the first time this component loads, try to do a checkout in littlepay-dropin-ui div
    const clientToken =
      "eyJhdXRoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnlaWEYxWlhOMFgzUjVjR1VpT2lKRlEwOU5YME5CVWtSZlZFOUxSVTVKVTBGVVNVOU9JaXdpY0dGeWRHbGphWEJoYm5SZmFXUWlPaUpzY0NJc0luQmhlVzFsYm5SZmFXNTBaVzUwWDJsa0lqb2ljR2xmTWpWbVlUazBNbUV0WVRrMVlTMDBORGswTFRrd05qY3RaamN4TURGalpURmxNR000SWl3aVkzVnpkRzl0WlhKZmNISnZabWxzWlY5cFpDSTZJbU53WHpNMFpESmhaRFV4TFdVeU9XVXROR1UxWVMwNE9XRmtMV1ptWW1VellXVTRaR1k1TmlJc0ltNWhiV1VpT2lKRlEwOU5YME5CVWtSZlZFOUxSVTVKVTBGVVNVOU9JaXdpWlhod0lqb3hOalF4TURrd05qVTBMamN6TVgwLmhPOEw4UGVSbFlDWlJVaEpsamYyZ3dJSERfZGhVVlY4QVM0TUdGTVZNZXMiLCJodHRwc19hcGkiOiJodHRwczovL2NoZWNrb3V0LmRldjEubGl0dGxlcGF5LmNvbS9jdXN0b21lci92MSJ9";
    console.log(clientToken);
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
    console.log(littlePay);
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
    // littlePay.makePayment();
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
