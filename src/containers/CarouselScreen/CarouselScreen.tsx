import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Carousel from "./components/Carousel";
import useCarouselLogic from './hooks/useCarouselLogic';

const DISPLAY_BLOCK_AMOUNT: number = 4;

const CarouselScreen: React.FC = () => {
  const {
    isDataLoading,
    handleNext,
    handlePrev,
    onViewableItemsChanged,
    data,
    flatListRef,
    isActivePrevButton,
    isActiveNextButton,
  } = useCarouselLogic(DISPLAY_BLOCK_AMOUNT);

  const renderButtons = () => {
    return (
      <View style={styles.buttonWrapper} >
        <TouchableOpacity
          disabled={!isActivePrevButton}
          onPress={handlePrev}
          style={[styles.button, !isActivePrevButton && styles.disabledButton]}>
            <Text>{'PREV'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!isActiveNextButton}
          onPress={handleNext}
          style={[styles.button, !isActiveNextButton && styles.disabledButton]}>
            <Text>{'NEXT'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Carousel
        data={data}
        onViewableItemsChanged={onViewableItemsChanged}
        isLoading={isDataLoading}
        flatListRef={flatListRef}
        displayBlocksAmount={DISPLAY_BLOCK_AMOUNT}
      />
      {renderButtons()}
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    borderRadius: 14,
  },
  buttonWrapper: {
    width: "100%",
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default CarouselScreen;