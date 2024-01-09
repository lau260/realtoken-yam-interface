import BigNumber from 'bignumber.js';

import { RootState } from 'src/store/store';
import { OFFER_LOADING, Offer } from 'src/types/offer/Offer';
import { Price } from 'src/types/price';

import { selectAddress } from '../settings/settingsSelector';

export const selectOffersIsLoading = (state: RootState) =>
  state.interface.offers.isLoading;
export const selectProperties = (state: RootState) =>
  state.interface.properties.properties;
export const selectPropertiesIsLoading = (state: RootState) =>
  state.interface.properties.isloading;

export const selectOffers = (state: RootState): Offer[] =>
  state.interface.offers.offers;

export const selectAddressOffers = (state: RootState) => {
  const address = selectAddress(state);
  const offers = selectOffers(state);

  if (!address || !offers) return OFFER_LOADING;
  return offers.filter((offer: Offer) => offer.sellerAddress == address);
};

export const selectPublicOffers = (state: RootState) => {
  const offers = selectOffers(state);
  const offersIsLoading = selectOffersIsLoading(state);
  if (!offers || offersIsLoading) return OFFER_LOADING;
  return offers.filter(
    (offer: Offer) =>
      !offer.buyerAddress &&
      BigNumber(offer.amount).isPositive() &&
      !BigNumber(offer.amount).isZero()
  );
};

export const selectAllPublicOffers = (state: RootState) => {
  const offers = selectOffers(state);
  const offersIsLoading = selectOffersIsLoading(state);
  if (!offers || offersIsLoading) return OFFER_LOADING;
  return offers.filter(
    (offer: Offer) =>
      !offer.buyerAddress && BigNumber(offer.amount).isPositive()
  );
};

export const selectPrivateOffers = (state: RootState) => {
  const address = selectAddress(state);
  const offers = selectOffers(state);
  const offersIsLoading = selectOffersIsLoading(state);

  if (!address || !offers || offersIsLoading) return OFFER_LOADING;
  return offers.filter((offer: Offer) => offer.buyerAddress == address);
};

export const selectPricesIsLoading = (state: RootState): boolean => {
  return state.interface.prices.isLoading;
};

export const selectPrices = (state: RootState): Price => {
  return state.interface.prices.prices;
};

export const selectPropertiesWhitelisted = (state: RootState): number[] | undefined => {
  return state.interface.wlProperties.wlPropertiesId;
}

export const selectAskForOfferRefresh = (state: RootState): boolean => state.interface.offers.askForOfferRefresh;