import { create } from "zustand";
import { CryptoCurrency, CryptoPrice, Pair } from "./types";
import { fetchCryptoPrice, getCyptos } from "./services/CryptoServices";

type CryptoStore = {
    cryptoCurrencies: CryptoCurrency[];
    result: CryptoPrice;
    loading: boolean;
    fetchCryptos: () => Promise<void>;
    fetchData: (pair: Pair) => Promise<void>;
    
}

export const useCryptoStore = create<CryptoStore>( (set) => ({
    cryptoCurrencies: [],
    //result: {} as CryptoPrice,
    result:  {
        IMAGEURL: '',
        PRICE: '',
        HIGHDAY: '',
        LOWDAY: '',
        CHANGEPCT24HOUR: '',
        LASTUPDATE: ''
    },
    loading: false,
    fetchCryptos: async () => {
        const cryptoCurrencies = await getCyptos();

        set( () => ({ cryptoCurrencies }));
    },
    fetchData: async (pair) => {

        set( () => ({ loading: true }));

        const result = await fetchCryptoPrice(pair);

        set( () => ({ result, loading: false }));
    }
}));