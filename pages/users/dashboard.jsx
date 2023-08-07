import dynamic from 'next/dynamic';

import Meta from '@/components/Meta';
import ClientOnly from '@/components/ClientOnly';

import { parseCookie } from '@/utils/index';
import { getUserAlbums } from '@/services/albumService';

import styles from '@/styles/Dashboard.module.scss';

const DashboardCard = dynamic(() => import('@/components/DashboardCard'), { ssr: false });

const Dashboard = ({ albums }) => {
  return (
    <ClientOnly>
      <Meta title='User Dashboard - Albumz Music Entertainment' />
      <section className={styles.container}>
        <h1 className={styles.header}>Dashboard</h1>
        {albums.length === 0 ? (
          <h2>There are no albums in the database</h2>
        ): (
          <DashboardCard albums={albums} />
        )}
      </section>
    </ClientOnly>
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
