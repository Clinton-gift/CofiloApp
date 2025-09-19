// Create a hooks/useFrameSize.ts file
import { useWindowDimensions } from 'react-native';

export const useFrameSize = () => {
  const { width, height } = useWindowDimensions();
  
  return {
    width,
    height,
    isLargeScreen: width > 768,
    isMediumScreen: width > 480 && width <= 768,
    isSmallScreen: width <= 480,
  };
};

export default useFrameSize;