"use client";
import { socket } from '@/socket';
import { useEffect } from 'react';

export default function ClientPage() {

  useEffect(() => { initSocket(); }, [])

  const initSocket = async () => {
    await fetch('/api/socket');
    socket.on('connect', () => {
      console.log('client connected')
    })
    socket.on('update-location', msg => {
      console.log(msg)
    })
    return null;
  }
  return (
    <div>
    </div>
  )
}

