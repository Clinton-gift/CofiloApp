import React, { Fragment } from 'react';
import HomePageHeadingSection from './HomePageHeadingSection';
import HomePageImage from './HomePageImage';

type Props = {
  onSupportPress?: () => void;
  onBannerPress?: () => void; // NEW
};

export default function HomePageImageSection({ onSupportPress, onBannerPress }: Props) {
  return (
    <Fragment>
      <HomePageHeadingSection onSupportPress={onSupportPress} />
      <HomePageImage onPress={onBannerPress} />
    </Fragment>
  );
}
