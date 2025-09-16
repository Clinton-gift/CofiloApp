import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  useWindowDimensions,
  type DimensionValue,
} from 'react-native';
import { Image } from 'expo-image';

const GREEN = '#10B981';

type Props = {
  view: 'listing' | 'added';
  /** Space to keep above the bottom tools */
  bottomOffset: number;
  /** Optional width for the image area. Examples: 320, '90%' (default '100%') */
  imageWidth?: DimensionValue;
  /** Optional height for the image area in px. If omitted, it fills remaining space */
  imageHeight?: number;
  onPressImage?: () => void;
};

export default function AmazonPageProductsSection({
  view,
  bottomOffset,
  imageWidth = '100%',
  imageHeight,
  onPressImage,
}: Props) {
  const { width: screenW, height: screenH } = useWindowDimensions();

  const src =
    view === 'added'
      ? require('../../assets/images/Musicproduct.png')
      : require('../../assets/images/Products.png');

  // Clamp numeric sizes to the current screen for responsiveness
  const resolvedWidth: DimensionValue = useMemo(() => {
    return typeof imageWidth === 'number' ? Math.min(imageWidth, screenW) : imageWidth;
  }, [imageWidth, screenW]);

  const resolvedHeight: number | undefined = useMemo(() => {
    if (typeof imageHeight === 'number') {
      // keep a little headroom so it never pushes under the bottom tools
      const maxAllowed = Math.max(0, screenH - bottomOffset);
      return Math.min(imageHeight, maxAllowed);
    }
    return undefined; // will flex to fill
  }, [imageHeight, screenH, bottomOffset]);

  const containerStyle = [
    styles.imageTapArea,
    { width: resolvedWidth, alignSelf: 'center' as const },
    resolvedHeight ? { height: resolvedHeight } : { flex: 1 },
  ];

  return (
    <View style={[styles.contentArea, { paddingBottom: bottomOffset }]}>
      <Pressable onPress={onPressImage} style={containerStyle}>
        <Image source={src} style={styles.products} contentFit="fill" />
      </Pressable>

      {view === 'added' && (
        <View style={[styles.addedPill, { bottom: bottomOffset + 16 }]}>
          <Text style={styles.addedPillText}>Added to cart</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // fills all space between header and bottom tools
  contentArea: { flex: 1 },

  // sizing container for the image (centered horizontally)
  imageTapArea: {
    // width & height applied dynamically; stays centered
  },

  // Image fills its container; contain => no cropping
  products: {
    width: '100%',
    height: '100%',
  },

  // green pill centered above tools
  addedPill: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  addedPillText: {
    paddingHorizontal: 18,
    paddingVertical: 13,
    backgroundColor: GREEN,
    borderRadius: 999,
    color: '#fff',
    fontFamily: 'ClashGrotesk',
    fontSize: 16,
    fontWeight: '600',
    overflow: 'hidden',
  },
});
