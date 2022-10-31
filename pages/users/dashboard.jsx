import { lazy, Suspense } from 'react';

import Meta from '@/components/Meta';
import Spinner from '@/components/Spinner';
import { parseCookie } from '@/utils/index';
import styles from '@/styles/Dashboard.module.scss';
import { getUserAlbums } from '@/services/albumService';

const DashboardCard = lazy(() => import('@/components/DashboardCard'));

const Dashboard = ({ albums }) => {
  return (
    <>
      <Meta title='User Dashboard - Albumz Music Entertainment' />
      <section className={styles.container}>
        <h1 className={styles.header}>Dashboard</h1>
        <Suspense fallback={<Spinner />}>
          <DashboardCard albums={albums} />
        </Suspense>
      </section>
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookie(req);
  
  if (!token || token === '') {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  
  const { data } = await getUserAlbums(token);

  return {
    props: {
      albums: data.albums,
    },
  };
};

export default Dashboard;
