import React, { Component } from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

const Card = ({title, description, uri}) => {
    return (
      <View style={styles.card}>
        <Image source={uri} style={styles.image} />
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.body}>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </View>
    );
  };
  
export default Card;

const styles = StyleSheet.create({
    card: {
      marginTop: 20,
      marginBottom: 20,
      alignItems: 'center',
      borderRadius: 10,
    },
    cardTitle: {
      fontWeight: 'bold',
      fontSize: 25,
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 30,
      marginTop: 10,
      marginBottom: 10,
    },
    body: {
      width: '60%',
    },
    cardDescription: {
      padding: 10,
      fontSize: 15,
      textAlign: 'center',
    },
  });
  