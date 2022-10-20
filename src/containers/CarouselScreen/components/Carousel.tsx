import React, { useMemo } from "react"
import { View, Text, FlatList, ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import CarouselItem, { ICarouselItem } from "../components/CarouselItem";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ICarouselProps {
  data: ICarouselItem[];
  onViewableItemsChanged: (props: any) => void;
  displayBlocksAmount: number;
  isLoading: boolean;
  flatListRef: any;
}

const Carousel: React.FC<ICarouselProps> = (props) => {

  const itemSize = useMemo(() => ((screenWidth - 20 * (props.displayBlocksAmount + 1))/ props.displayBlocksAmount), [props.displayBlocksAmount])

  if (props.isLoading) {
    return (
      <View style={styles.wrapper}>
        <ActivityIndicator />
      </View>
    )
  } 

  const renderCarouselImage = ({ item }: { item: ICarouselItem }) => {
    return (
      <CarouselItem {...item} size={itemSize} />
    );    
  }
  return (
    <View style={styles.wrapper}>
      <FlatList 
        data={props.data} 
        renderItem={renderCarouselImage}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        bounces={false}
        decelerationRate={0}
        renderToHardwareTextureAndroid
        snapToInterval={itemSize + 20}
        snapToAlignment="start"
        scrollEventThrottle={16}
        onViewableItemsChanged={props.onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        contentContainerStyle={{ paddingRight: 20, alignItems: "center", justifyContent: "center",  }}
        ref={ref => props.flatListRef.current = ref}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: screenWidth,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Carousel;