import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text, RefreshControl } from 'react-native';
import { fetchDrinksByCategory } from '../api/cocktailApi';
import DrinkCard from '../components/DrinkCard';

export default function HomeScreen({ navigation }) {
    const [drinks, setDrinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    async function load() {
        setLoading(true);
        try {
            const list = await fetchDrinksByCategory('Cocktail');
            setDrinks(list);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function onRefresh() {
        setRefreshing(true);
        await load();
        setRefreshing(false);
    }

    function renderItem({ item }) {
        return (
            <DrinkCard
                drink={item}
                onPress={() => navigation.navigate('Detail', { id: item.idDrink })}
            />
        );
    }

    return (
        <View style={styles.container}>
            {loading ? <ActivityIndicator size="large" style={{ marginTop: 20 }} /> : (
                <FlatList
                    data={drinks}
                    keyExtractor={(item) => item.idDrink}
                    renderItem={renderItem}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    ListEmptyComponent={<Text style={styles.empty}>Nenhum drink encontrado.</Text>}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f2f2f2' },
    empty: { textAlign: 'center', marginTop: 20, color: '#555' },
});
