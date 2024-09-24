"use client"
import React, {useEffect} from 'react'
import {Button} from "@/components/ui/button";
import {UserButton} from "@clerk/nextjs";
import {Modal} from "@/components/ui/modal";
import {useStoreModal} from "@/hooks/use-store-modal";

const SetupPage = () => {
    const onOpen = useStoreModal((state) => state.onOpen);
    const isOpen = useStoreModal((state) => state.isOpen);

    useEffect(() => {
        if(!isOpen){
            onOpen();
        }
    }, [isOpen, onOpen]);
    return null
}
export default SetupPage
