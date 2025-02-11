import React from 'react';
import { View, Text, StyleSheet } from 'react-native';




const ThemeSelector = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Theme Selector Page</Text>
    </View>
  );
};

export default ThemeSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171717',
  },
  text: {
    fontSize: 24,
    color: '#FFF',
  },
});
