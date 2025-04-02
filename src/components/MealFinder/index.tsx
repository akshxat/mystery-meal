'use client'

import { useState, useMemo, useRef } from 'react';
import { useFormStatus } from 'react-dom';

export default function MealFinder() {
    const { pending, data } = useFormStatus();
    const [distanceValue, setDistanceValue] = useState(25);
    const [priceValue, setPriceValue] = useState(4);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = {
            distance: distanceValue,
            price: priceValue,
        };
        console.log('Form Data:', formData);
    };

    return (
        <div className="max-w-2xl mx-auto mt-12">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6 p-6 bg-gray-50 rounded-md shadow-md">
                <div className="flex flex-col">
                    <label htmlFor="distance" className="mb-2 text-gray-700 font-semibold">Distance: {distanceValue} Kilometers</label>
                    <input
                        type="range"
                        id="distance"
                        min="0"
                        max="25"
                        value={distanceValue}
                        onChange={(e) => setDistanceValue(Number(e.target.value))}
                        disabled={pending}
                        className="w-full"
                    />
                    <br></br>
                    <label htmlFor="price" className="mb-2 text-gray-700 font-semibold">Price:</label>
                    <div className="flex space-x-2">
                        <button
                            type="button"
                            onClick={() => setPriceValue(1)}
                            disabled={pending}
                            aria-pressed={priceValue === 1}
                            className={`px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 ${
                                priceValue === 1 ? 'bg-gray-200' : ''
                            }`}
                        >
                            $
                        </button>
                        <button
                            type="button"
                            onClick={() => setPriceValue(2)}
                            disabled={pending}
                            aria-pressed={priceValue === 2}
                            className={`px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 ${
                                priceValue === 2 ? 'bg-gray-200' : ''
                            }`}
                        >
                            $$
                        </button>
                        <button
                            type="button"
                            onClick={() => setPriceValue(3)}
                            disabled={pending}
                            aria-pressed={priceValue === 3}
                            className={`px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 ${
                                priceValue === 3 ? 'bg-gray-200' : ''
                            }`}
                        >
                            $$$
                        </button>
                        <button
                            type="button"
                            onClick={() => setPriceValue(4)}
                            disabled={pending}
                            aria-pressed={priceValue === 4}
                            className={`px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 ${
                                priceValue === 4 ? 'bg-gray-200' : ''
                            }`}
                        >
                            $$$$
                        </button>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={pending}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    Go!
                </button>
            </form>
        </div>
    )
}