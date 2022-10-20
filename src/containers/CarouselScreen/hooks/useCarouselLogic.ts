import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { ICarouselItem } from '../components/CarouselItem';
import dataMock from "../../../helpers/dataMock.json";

const useCarouselLogic = (displayBlockAmount) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef(null);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const [data, setData] = useState<ICarouselItem[]>([]);
  const isActivePrevButton = useMemo(() => !(isDataLoading || currentIndex === 0), [isDataLoading, currentIndex])
  const isActiveNextButton = useMemo(() => !(isDataLoading || currentIndex + displayBlockAmount === data.length), [isDataLoading, currentIndex, data])
  console.log(dataMock)
  useEffect(() => {
    setTimeout(() => {
      setData(dataMock)
      setIsDataLoading(false);
    }, 400)
  }, [])
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }) => {
      setCurrentIndex(viewableItems[0].index);
    },
    [setCurrentIndex],
  );

  const handlePrev = () => {
    flatListRef?.current?.scrollToIndex({
      index: Math.max(currentIndex - displayBlockAmount, 0),
    });
  }

  const handleNext = () => {

    flatListRef?.current?.scrollToIndex({
      index: Math.min(currentIndex + displayBlockAmount, data.length - displayBlockAmount),
    });
  }

  return {
    isDataLoading,
    handleNext,
    handlePrev,
    onViewableItemsChanged,
    data,
    flatListRef,
    isActivePrevButton,
    isActiveNextButton,
  }

}

export default useCarouselLogic;