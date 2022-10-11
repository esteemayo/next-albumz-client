import Meta from '@/components/Meta';
import { parseCookie } from '@/utils/index';
import styles from '@/styles/Dashboard.module.scss';
import DashboardCard from '@/components/DashboardCard';
import { getUserAlbums } from '@/services/albumService';

const Dashboard = ({ albums }) => {
  return (
    <>
      <Meta title='User Dashboard - Albumz Music Entertainment' />
      <section className={styles.container}>
        <h1 className={styles.header}>Dashboard</h1>
        {albums.map((item) => {
          return <DashboardCard key={item._id} {...item} />;
        })}
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
