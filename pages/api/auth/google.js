import cookie from 'cookie';
import { googleLogin } from '@/services/authService';

const handler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { data, status } = await googleLogin({ ...req.body });

        if (status === 200) {
          res.setHeader(
            'Set-Cookie',
            cookie.serialize('token', data.token, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== 'development',
              maxAge: 60 * 60,
              sameSite: 'strict',
              path: '/',
            })
          );

          return res.status(200).json({ ...data });
        }
      } catch (err) {
        console.log(err);
        return res.status(401).json({ message: err.message });
      }
    
    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ message: `Method ${method} not allowed`});
  }
};

export default handler;
