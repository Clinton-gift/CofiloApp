import React, { Fragment } from 'react';
import OrdersPageHeadingSection from './OrdersPageHeadingSection';
import OrdersPageOrdersOptionsSection from './OrdersPageOrdersOptionsSection';

type Props = { bottomSpacer?: number };

export default function OrdersPage({ bottomSpacer = 8 }: Props) {
  // Designed to live inside the HomePage ScrollView
  return (
    <Fragment>
      <OrdersPageHeadingSection />
      <OrdersPageOrdersOptionsSection bottomSpacer={bottomSpacer} />
    </Fragment>
  );
}
