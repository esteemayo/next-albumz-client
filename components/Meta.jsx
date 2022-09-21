import Head from 'next/head';

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta property='og:title' content='Get millions of songs.' />
      <meta property='og:description' content='Plus your entire music library on all your devices.' />
      <meta property='og:site_name' content='Albumz Music Entertainmnt' />
      <meta charSet='UTF-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};

Meta.defaultProps = {
  title: 'Albumz Music Entertainment - Official Website',
  description: 'Music album manager that manages your music collection',
  keywords: 'Albumz, music, online, listen, streaming, play, digital, album, artist, playlist',
};

export default Meta;
