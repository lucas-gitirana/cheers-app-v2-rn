import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { fetchDrinkDetails } from '../api/cocktailApi';
import { FavoritesContext } from '../context/FavoritesContext';

function extractIngredients(drink) {
    const items = [];
    for (let i = 1; i <= 15; i++) {
        const ingr = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        if (ingr) {
            items.push(`${measure ? measure.trim() + ' ' : ''}${ingr}`);
        }
    }
    return items;
}

export default function DetailScreen({ route, navigation }) {
    const { id } = route.params;
    const [drink, setDrink] = useState(null);
    const [loading, setLoading] = useState(true);
    const { toggleFavorite, isFavorited } = useContext(FavoritesContext);

    useEffect(() => {
        (async () => {
            try {
                const d = await fetchDrinkDetails(id);
                setDrink(d);
            } catch (e) {
                console.error(e);
                Alert.alert('Erro', 'Não foi possível carregar o drink.');
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (loading) return <ActivityIndicator style={{ marginTop: 20 }} size="large" />;

    if (!drink) return <Text style={{ margin: 20 }}>Drink não encontrado.</Text>;

    const ingredients = extractIngredients(drink);
    const favorited = isFavorited(drink.idDrink);

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: drink.strDrinkThumb }} style={styles.image} />
            <View style={styles.header}>
                <Text style={styles.title}>{drink.strDrink}</Text>
                <TouchableOpacity
                    style={[styles.favButton, favorited ? styles.favOn : styles.favOff]}
                    onPress={() => toggleFavorite({
                        idDrink: drink.idDrink,
                        strDrink: drink.strDrink,
                        strDrinkThumb: drink.strDrinkThumb
                    })}
                >
                    <Text style={{ color: '#fff', fontWeight: '600' }}>{favorited ? 'Remover' : 'Favoritar'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Categoria</Text>
                <Text>{drink.strCategory || '-'}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ingredientes</Text>
                {ingredients.map((it, idx) => (
                    <Text key={idx}>• {it}</Text>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Instruções</Text>
                <Text>{drink.strInstructions}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    image: { width: '100%', height: 260 },
    header: { padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    title: { fontSize: 20, fontWeight: '700', flex: 1 },
    favButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
    favOn: { backgroundColor: '#E53935', marginLeft: 12 },
    favOff: { backgroundColor: '#1976D2', marginLeft: 12 },
    section: { paddingHorizontal: 16, paddingVertical: 8 },
    sectionTitle: { fontWeight: '700', marginBottom: 6 },
});
