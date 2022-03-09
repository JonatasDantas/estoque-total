import { GetServerSideProps } from 'next';
import { FunctionComponent } from 'react';
import { validateToken } from 'src/services/authService';

const Home: FunctionComponent = () => {
  return (
    <div>
            Logged in
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const validationResult = await validateToken(ctx);

  if (!validationResult) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;