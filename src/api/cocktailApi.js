const BASE = 'https://www.thecocktaildb.com/api/json/v1/1';

export async function fetchDrinksByCategory(category = 'Cocktail') {
    // retorna lista com idDrink, strDrink, strDrinkThumb
    const res = await fetch(`${BASE}/filter.php?c=${encodeURIComponent(category)}`);
    const data = await res.json();
    return data.drinks || [];
}

export async function fetchDrinkDetails(id) {
    const res = await fetch(`${BASE}/lookup.php?i=${encodeURIComponent(id)}`);
    const data = await res.json();
    return (data.drinks && data.drinks[0]) || null;
}
