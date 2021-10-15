import React from 'react';
import styles from './style.module.scss';

interface Props {
  priceId: string;
}

const SubscribeButton = ({ priceId }: Props) => {
  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe now
    </button>
  );
};

export default SubscribeButton;
