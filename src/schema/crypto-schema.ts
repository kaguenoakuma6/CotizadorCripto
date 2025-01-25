import { z } from "zod";

export const CurrencySchema = z.object({
    code: z.string(),
    name: z.string()
});

export const CryoptoCurrencyRespSchema = z.object({
    CoinInfo: z.object({
        FullName: z.string(),
        Name: z.string()
    })
});

export const CryoptoCurrenciesRespSchema = z.array(CryoptoCurrencyRespSchema);

export const PairSchema = z.object({
    currency: z.string(),
    criptoCurrency: z.string()
});


export const CryptoPriceSchema = z.object({
    IMAGEURL: z.string(),
    PRICE: z.string(),
    HIGHDAY: z.string(),
    LOWDAY: z.string(),
    CHANGEPCT24HOUR: z.string(),
    LASTUPDATE: z.string()
});