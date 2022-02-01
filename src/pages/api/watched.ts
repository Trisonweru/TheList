import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../lib/prisma';
//An API to help create a user when they sign up.

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  //Check if the request type if its post, if not we send status 405 with a message of method not aloowed.
  if (req.method != 'POST') {
    return res.status(405).json({ status: 405, message: 'Method Not Allowed' });
  }
  // if user, we create the user in the database using prisma create function.
  try {
    const { data, session } = req.body;
    if (!session) {
      return res
        .status(405)
        .json({ status: 403, message: 'Not Authenticated' });
    }
    const watchedItem = await prisma?.watchList.update({
      where: {
        id: data.id,
      },
      data: {
        watched: true,
      },
    });

    return res.status(200).json(watchedItem);
  } catch (err) {
    //if any error during the creation proces we catch it and send the error message to the frontend.
    res.status(400).json({ status: 400, message: 'Something went wrong' });
  }
};
