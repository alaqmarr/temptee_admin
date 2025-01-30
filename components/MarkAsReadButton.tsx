"use client"
import React from 'react'
import { Button } from './ui/button'
import prismadb from '@/lib/prismadb'
import toast from 'react-hot-toast'
import axios from 'axios'

const MarkAsReadButton = ({ id }: { id: string }) => {
    const handleMarkAsRead = async () => {
        const response = await axios.get(`/api/update-notification/${id}`);
        if (response.status === 200) {
            toast.success('Notification marked as read')
        } else {
            toast.error('Failed to mark notification as read')
        }
    };

    return (
        <div>
            <Button onClick={handleMarkAsRead}>Mark as read</Button>
        </div>
    );
}

export default MarkAsReadButton
