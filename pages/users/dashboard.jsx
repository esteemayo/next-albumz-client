import Meta from '@/components/Meta';
import styles from '@/styles/Dashboard.module.scss';
import DashboardCard from '@/components/DashboardCard';

const Dashboard = () => {
  return (
    <>
      <Meta title='User Dashboard - Albumz Music Entertainment' />
      <section className={styles.container}>
        <h1 className={styles.header}>Dashboard</h1>
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </section>
    </>
  );
};

export default Dashboard;
