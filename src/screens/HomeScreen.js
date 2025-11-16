import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { fetchPopularDrinks, fetchTrendingDrinks } from "../api/cocktailApi";
import DrinkCard from "../components/DrinkCard";

export default function HomeScreen({ navigation }) {
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function load() {
    try {
      const pop = await fetchPopularDrinks();
      const trend = await fetchTrendingDrinks();

      setPopular(pop);
      setTrending(trend);
    } catch (e) {
      console.warn(e);
    }
  }

  async function initialize() {
    setLoading(true);
    await load();
    setLoading(false);
  }

  useEffect(() => {
    initialize();
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
        onPress={() => navigation.navigate("Detail", { id: item.idDrink })}
      />
    );
  }

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => navigation.navigate("Search")}
      >
        <Text style={styles.searchButtonText}>
          Procura por um drink especial?
        </Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Drinks Populares</Text>

      <FlatList
        data={popular}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.idDrink}
        renderItem={renderItem}
        contentContainerStyle={styles.carousel}
      />

      <Text style={styles.sectionTitle}>Drinks Tendências</Text>

      <FlatList
        data={trending}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.idDrink}
        renderItem={renderItem}
        contentContainerStyle={styles.carousel}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 16,
    marginTop: 12,
    marginBottom: 6,
  },
  carousel: {
    paddingLeft: 10,
    paddingVertical: 10,
  },
  searchButton: {
    backgroundColor: "#E53935",
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
