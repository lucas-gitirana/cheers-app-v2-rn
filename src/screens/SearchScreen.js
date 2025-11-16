import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { searchDrinksByName } from "../api/cocktailApi";
import DrinkCard from "../components/DrinkCard";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(text) {
    setQuery(text);

    if (!text.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const data = await searchDrinksByName(text);
    setResults(data);
    setLoading(false);
  }

  function renderItem({ item }) {
    return (
      <DrinkCard
        drink={item}
        onPress={() => navigation.navigate("Detail", { id: item.idDrink })}
      />
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar drinks..."
        value={query}
        onChangeText={handleSearch}
      />

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      <FlatList
        data={results}
        keyExtractor={(item) => item.idDrink}
        renderItem={renderItem}
        ListEmptyComponent={
          !loading && query.length > 0 ? (
            <Text style={styles.empty}>Nenhum drink encontrado.</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 14, backgroundColor: "#f2f2f2" },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#555",
  },
});
