import AsyncStorage from '@react-native-async-storage/async-storage';

export const FAVORITES_KEY = '@favorites_drinks_v1';

export async function saveFavorites(list) {
    try {
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
    } catch (e) {
        console.error('Erro ao salvar favoritos', e);
    }
}

export async function loadFavorites() {
    try {
        const raw = await AsyncStorage.getItem(FAVORITES_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch (e) {
        console.error('Erro ao carregar favoritos', e);
        return [];
    }
}
