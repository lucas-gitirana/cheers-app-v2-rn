import React, { useContext } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';
import DrinkCard from '../components/DrinkCard';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FavoritesScreen({ navigation }) {
    const { favorites } = useContext(FavoritesContext);

    function renderItem({ item }) {
        return <DrinkCard drink={item} onPress={() => navigation.navigate('Detail', { id: item.idDrink })} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            {favorites.length === 0 ? (
                <Text style={styles.empty}>Você ainda não favoritou nenhum drink.</Text>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.idDrink}
                    renderItem={renderItem}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7f7f7' },
    empty: { marginTop: 40, textAlign: 'center', color: '#666' },
});
