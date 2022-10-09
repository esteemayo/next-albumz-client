import cookie from 'cookie';
import { register } from '@/services/userService';

const handler = async (req, res) => {
  const { method } = req;

  if (method === 'POST') {
    const { data, status } = await register({ ...req.body });

    try {
      if (status === 201) {
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60,
            sameSite: 'strict',
            path: '/',
          }),
        );
  
        return res.status(201).json({ ...data });
      }
    } catch (err) {
      return res.json(err);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${method} not allowed`});
  }
};

export default handler;
