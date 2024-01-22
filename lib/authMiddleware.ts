import { getServerSession } from 'next-auth/next';
import { authOptions } from '@lib/authConfig';

export const withAuth = async (req: any, res: any, allowUsers: boolean = false, app_router: boolean = false, allowNotAuthed: boolean = false) => {
    try {

        let session: any

        if (!app_router) {
            session = await getServerSession(req, res, authOptions as any);
        }
        else {
            session = await getServerSession(authOptions as any);
        }

        if (allowNotAuthed) {
            if (!session) {
                return null;
            }
        }

        if (!session) {
            res.status(401).json({ error: 'Unauthorized' });
            throw new Error('Unauthorized');
        }

        const { user } = session as {
            user: {
                name?: string | null;
                email?: string | null;
                image?: string | null;
                role?: string | null;
            };
        };

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            throw new Error('Unauthorized');
        }

        if (!allowUsers) {
            if (!user || (user && user.role !== 'admin')) {
                res.status(403).json({ error: 'You are not authorized to access this resource.' });
                throw new Error('Unauthorized');
            }
        }

        return user;

    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        throw new Error('Unauthorized');
    }
};
