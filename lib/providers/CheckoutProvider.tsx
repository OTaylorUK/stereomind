import { ApolloError } from "@apollo/client";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

import { CHECKOUT_TOKEN } from "@/lib/const";
import { CheckoutDetailsFragment, useCheckoutByTokenQuery } from "@/saleor/api";

import { useLocalStorage } from "lib/hooks/useLocalStorage";
import createSafeContext from "lib/useSafeContext";

export interface CheckoutConsumerProps {
  checkoutToken: string;
  setCheckoutToken: (token: string) => void;
  resetCheckoutToken: () => void;
  checkout: CheckoutDetailsFragment | undefined | null;
  checkoutError: ApolloError | undefined;
  loading: boolean;
}

export const [useCheckout, Provider] = createSafeContext<CheckoutConsumerProps>();


// updated cart data
export function CheckoutProvider({ children }: { children: typeof React.Children | ReactNode }) {
  const [checkoutToken, setCheckoutToken] = useLocalStorage(CHECKOUT_TOKEN, "", { sync: true });

  const {
    data,
    loading,
    error: checkoutError,
  } = useCheckoutByTokenQuery({
    variables: { checkoutToken },
    skip: !checkoutToken || typeof window === "undefined",
  });

  const resetCheckoutToken = () => setCheckoutToken("");

  const providerValues: CheckoutConsumerProps = {
    checkoutToken,
    setCheckoutToken,
    resetCheckoutToken,
    checkout: data?.checkout,
    loading,
    checkoutError,
  };

  return <Provider value={providerValues}>{children}</Provider>;
}
