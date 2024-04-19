'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Link } from '@nextui-org/react';
import { IoExitOutline } from "react-icons/io5";


export default function LogoutButton() {
    const router = useRouter();

    const logout = async () => {
        const response = await fetch('/api/auth/logout');
        if (response?.ok) {
            router.replace('/auth/login')
        }
    };

    return (    
        <Button onClick={logout} className='bg- flex justify-start text-start text-gray space-x-2'>
            <IoExitOutline className='w-5 h-5' />
            <p>Sign out</p>
        </Button>
    );
}
