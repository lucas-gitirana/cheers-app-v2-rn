import React, { createContext, useEffect, useState } from 'react';
import { saveFavorites, loadFavorites } from '../utils/storage';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]); // array de objetos de drink

    useEffect(() => {
        // carregar favoritos ao iniciar
        (async () => {
            const saved = await loadFavorites();
            setFavorites(saved || []);
        })();
    }, []);

    useEffect(() => {
        // persistir sempre que mudar
        saveFavorites(favorites);
    }, [favorites]);

    function isFavorited(drinkId) {
        return favorites.some(d => d.idDrink === drinkId);
    }

    function addFavorite(drink) {
        if (!isFavorited(drink.idDrink)) {
            setFavorites(prev => [drink, ...prev]);
        }
    }

    function removeFavorite(drinkId) {
        setFavorites(prev => prev.filter(d => d.idDrink !== drinkId));
    }

    function toggleFavorite(drink) {
        if (isFavorited(drink.idDrink)) {
            removeFavorite(drink.idDrink);
        } else {
            addFavorite(drink);
        }
    }

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorited }}>
            {children}
        </FavoritesContext.Provider>
    );
}
