import prismadb from '@/lib/prismadb';
import NotificationsClient from './NotificationsClient';


const Notifications = async ({ params }: { params: string }) => {
    // Fetch notifications on the server side
    const notifications = await prismadb.notifications.findMany({
        where: {
            storeId: params,
            read: false,
        },
        orderBy: {
            createdAt: 'desc', // Sort by creation date in descending order
        },
        include: {
            store: true,
        },
    });

    // Convert Date properties to strings
    const formattedNotifications = notifications.map(notification => ({
        ...notification,
        createdAt: notification.createdAt.toISOString(),
        updatedAt: notification.updatedAt.toISOString(),
    }));

    // Pass the fetched data to the client-side component
    return <NotificationsClient notifications={formattedNotifications} />;
};

export default Notifications;