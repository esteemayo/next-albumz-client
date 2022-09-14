import Head from 'next/head';

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta charset='UTF-8' />
      <meta http-equiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};

export default Meta;
