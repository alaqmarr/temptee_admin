import prismadb from '@/lib/prismadb'
import React from 'react'
import MarkAsReadButton from './MarkAsReadButton'
import Link from 'next/link'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader } from './ui/card'
import { Separator } from './ui/separator'

const Notifications = async ({ params }: { params: string }) => {
    const notifications = await prismadb.notifications.findMany({
        where: {
            storeId: params,
            read: false
        },
        orderBy: {
            createdAt: 'desc' // Sort by creation date in descending order
        },
        include: {
            store: true
        }
    })

    return (
        <Card
            className='bg-slate-200 w-full max-w-[90vw] flex flex-col items-center justify-center mt-4'
        >
            <CardHeader>
                Notifications
            </CardHeader>
            <CardContent
                className='w-full'
            >
                <div className='relative flex flex-col items-center justify-center p-5 mb-24'>
                    {notifications.length > 0 && (
                        notifications.map((notification, index) => (
                            <div
                                className={`w-full max-w-[90vw] p-4 rounded-lg shadow-lg absolute`}
                                key={notification.id}
                                style={{
                                    zIndex: notifications.length - index, // Newest notifications have higher z-index
                                    top: `${index * 10}px`, // Offset each notification to create a stack
                                    transform: `scale(${1 - index * 0.05})`, // Scale down older notifications
                                    opacity: `${1 - index * 0.2}`, // Fade out older notifications
                                    backdropFilter: `blur(${index * 2}px)`, // Add blur effect to older notifications
                                    backgroundColor: `rgba(255, 255, 255, ${0.9 - index * 0.2})`, // Semi-transparent white background
                                    border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle border for depth
                                }}
                            >
                                <p className='text-sm text-gray-500 mt-1'>
                                    {new Date(notification.createdAt).toLocaleTimeString()}
                                </p>
                                <p className='text-gray-800 font-medium mb-2'>{notification.message}</p>
                                <div
                                    className='flex items-start justify-evenly'
                                >
                                    {
                                        notification.type === 'payment' ? (
                                            <Link
                                                href={`upi://pay?pa=9618443558@axisbank&pn=MYSTORE%20-%20AL%20AQMAR&tn=Payment%20for%20${notification.store.id}&am=${notification.amount}`}
                                            >
                                                <Button>
                                                    Pay via UPI
                                                </Button>
                                            </Link>
                                        )
                                            :
                                            (
                                                <MarkAsReadButton id={notification.id} />
                                            )
                                    }
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default Notifications