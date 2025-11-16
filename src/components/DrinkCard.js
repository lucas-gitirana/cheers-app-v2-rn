import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";

export default function DrinkCard({ drink, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: drink.strDrinkThumb }} style={styles.thumb} />
      <View style={styles.body}>
        <Text style={styles.title}>{drink.strDrink}</Text>
        <Text style={styles.subtitle}>ID: {drink.idDrink}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    alignItems: "center",
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: 8,
  },
  body: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    marginTop: 6,
    color: "#666",
  },
});
