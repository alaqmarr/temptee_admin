'use client'; // Mark this component as a Client Component

import React, { useState } from 'react';
import MarkAsReadButton from './MarkAsReadButton';
import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { IndianRupeeIcon, InfoIcon, Terminal } from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { format } from 'date-fns';
import { Separator } from './ui/separator';

interface Notification {
    id: string;
    type: string;
    message: string;
    amount?: number;
    createdAt: string;
    store?: {
        id: string;
    };
}

const NotificationsClient = ({ notifications: initialNotifications }: { notifications: Notification[] }) => {
    const [notificationStack, setNotificationStack] = useState(initialNotifications);

    const handleSwipeUp = (id: string) => {
        setNotificationStack((prevStack) => {
            const swipedNotification = prevStack.find((n) => n.id === id);
            const remainingNotifications = prevStack.filter((n) => n.id !== id);
            return swipedNotification ? [...remainingNotifications, swipedNotification] : remainingNotifications;
        });
    };

    return (
        <Card className="bg-slate-200 w-full max-w-[90vw] flex flex-col items-center justify-center mt-4">
            <CardHeader>Notifications</CardHeader>
            <CardContent className="w-full">
                <div className="relative flex flex-col items-center justify-center p-5 mb-24">
                    {notificationStack.length > 0 &&
                        notificationStack.map((notification, index) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                index={index}
                                totalNotifications={notificationStack.length}
                                onSwipeUp={() => handleSwipeUp(notification.id)}
                            />
                        ))}
                </div>
            </CardContent>
        </Card>
    );
};

const NotificationItem = ({
    notification,
    index,
    totalNotifications,
    onSwipeUp,
}: {
    notification: Notification;
    index: number;
    totalNotifications: number;
    onSwipeUp: () => void;
}) => {
    const y = useMotionValue(0);
    const opacity = useTransform(y, [-100, 0], [0, 1]);
    const scale = useTransform(y, [-100, 0], [0.9, 1]);

    const handleDragEnd = (event: any, info: any) => {
        if (info.offset.y < -50) {
            // Swipe up detected
            onSwipeUp();
        }
    };

    return (
        <motion.div
            style={{
                zIndex: totalNotifications - index,
                y,
                opacity,
                scale,
                position: 'absolute',
                top: `${index * 10}px`,
                touchAction: 'pan-y', // Prevent page scroll while swiping
            }}
            drag="y" // Enable vertical drag
            dragConstraints={{ top: 0, bottom: 0 }} // Restrict drag to vertical axis
            onDragEnd={handleDragEnd}
            whileTap={{ scale: 0.95 }} // Add a slight scale effect on tap
        >
            <Alert
                className="p-4 rounded-lg shadow-lg bg-orange-50" // Static Tailwind classes
                style={{
                    width: `${300 - index * 10}px`, // Dynamic width

                    border: '1px solid rgba(255, 255, 255, 0.1)', // Static border
                }}
            >
                {/* Alert content */}
                {
                    notification.type === 'payment' ? (
                        <IndianRupeeIcon className='w-4 h-4' />
                    ) : (
                        <InfoIcon className='w-4 h-4' />
                    )
                }
                <AlertTitle className='text-sm'>
                    {format(new Date(notification.createdAt), 'EEEE dd/MM/yyyy')} | &nbsp;
                    {notification.type}

                </AlertTitle>
                <AlertDescription className="w-full break-all flex flex-col items-center justify-center text-start">
                    <div className="w-full">{notification.message}</div>
                    <Separator className='mb-2 bg-black mt-2' />
                    <div className="w-full flex flex-row justify-evenly">
                        {notification.type === 'payment' ? (
                            <>
                                <Link
                                    href={`upi://pay?pa=9618443558@axisbank&pn=MYSTORE%20-%20AL%20AQMAR&tn=Payment%20for%20${notification.store?.id}&am=${notification.amount}`}
                                >
                                    <Button variant={'default'}>UPI : 1</Button>
                                </Link>
                                <Link
                                    href={`upi://pay?pa=9618443558@indie&pn=MYSTORE%20-%20AL%20AQMAR&tn=Payment%20for%20${notification.store?.id}&am=${notification.amount}`}
                                >
                                    <Button variant={'default'}>UPI : 2</Button>
                                </Link>
                            </>
                        ) : (
                            <MarkAsReadButton id={notification.id} />
                        )}
                    </div>
                </AlertDescription>
            </Alert>
        </motion.div>
    );
};

export default NotificationsClient;