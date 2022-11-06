import Head from 'next/head'
import { useRouter } from 'next/router';

import { Typography, Button } from '@mui/material';

import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>SaveASpot</title>
        <meta name="description" content="Save me parking spaces!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.root}>
        <Typography variant="h2" className={styles.title}>
          Welcome to {' '}
          <span style={{ color: 'green' }}>Save</span>A<span style={{ color: 'blue' }}>Spot</span>!    
        </Typography> 
        <Button className={styles.btn} variant="contained" size="large" onClick={() => router.push('/spaces')}>
          Proceed
        </Button>
      </div>
    </div>
  );
}
