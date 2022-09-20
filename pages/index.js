import Hero from '@/components/Hero';
import TopReviews from '@/components/TopReviews';
import FeaturedAlbums from '@/components/FeaturedAlbums';
import styles from '@/styles/Home.module.scss';

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedAlbums />
      <TopReviews />
    </>
  );
};

export default Home;
