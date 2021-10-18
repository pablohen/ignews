import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React from 'react';
import api from '../../services/api';
import getStripeJs from '../../services/stripe-js';
import styles from './style.module.scss';

interface Props {
  priceId: string;
}

const SubscribeButton = ({ priceId }: Props) => {
  const [session] = useSession();
  const router = useRouter();
  const handleSubscribe = async () => {
    if (!session) {
      signIn('github');
      return;
    }

    if (session.activeSubscription) {
      router.push('/posts');
      return;
    }

    try {
      const res: any = await api.post('/subscribe');
      const { sessionId } = res.data;

      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
};

export default SubscribeButton;
