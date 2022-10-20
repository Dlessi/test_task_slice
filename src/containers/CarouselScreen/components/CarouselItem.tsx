import React, { useMemo } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export interface ICarouselItem {
  title: string;
  images: string[];
}

interface ICarouselItemProps extends ICarouselItem {
  size: number;
}

const CarouselItem: React.FC<ICarouselItemProps> = (props) => {
  const itemUrl = useMemo(() => props.images[Math.floor(Math.random() * props.images.length)], [props.images])
  console.log(props.size)
  return (
    <View style={styles.wrapper}>
      <Image source={{ uri: itemUrl}} style={[{ width: props.size, height: props.size }, styles.image]} />
      <Text style={[{ width: props.size }, styles.text]}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginLeft: 20 },
  image: { marginBottom: 15 },
  text: {  textAlign: "center"  }
});

export default CarouselItem;
