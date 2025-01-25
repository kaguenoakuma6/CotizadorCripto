import { ChangeEvent, FormEvent, useState } from 'react';
import { currencies } from '../data'
import { useCryptoStore } from '../store'
import { Pair } from '../types';
import ErrorMessage from './ErrorMessage';

export default function CryptoSearchForm() {

    const cryptoCurrencies = useCryptoStore( (state) => state.cryptoCurrencies);
    const fetchData = useCryptoStore( (state) => state.fetchData);

    const [pair, setPair] = useState<Pair>({
        currency: '',
        criptoCurrency: ''
    });

    const [error, setError] = useState('');

    const handleChange = ( e: ChangeEvent<HTMLSelectElement>) => {
        setPair({
            ...pair,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // se valida si alguno de los elementos esta vacio y se guarda el mensaje de error
        if(Object.values(pair).includes(''))
        {
            setError('Todos los campos son obligatorios');
            return;
        }
        setError('');

        fetchData(pair);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="field">
                <label htmlFor="currency">Moneda:</label>
                <select name="currency" id="currency" onChange={handleChange} value={pair.currency}>
                    <option value="">-- Seleccione --</option>
                    {currencies.map(currency => (
                        <option key={currency.code} value={currency.code}>{currency.name}</option>
                    ))}
                </select>
            </div>
            <div className="field">
                <label htmlFor="criptoCurrency">Criptomoneda:</label>
                <select name="criptoCurrency" id="criptoCurrency" onChange={handleChange} value={pair.criptoCurrency}>
                    <option value="">-- Seleccione --</option>
                    {cryptoCurrencies.map( crypto => (
                        <option key={crypto.CoinInfo.Name} value={crypto.CoinInfo.Name}>{crypto.CoinInfo.FullName}</option>
                    )) }
                </select>
            </div>

            <input type="submit" value="Cotizar" />
        </form>
    )
}
