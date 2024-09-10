'use client';
import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import { createDocument } from '@/lib/actions/room.actions';
import { useRouter } from 'next/navigation';

export default function AddDocumentBtn({ userId, email }: AddDocumentBtnProps) {
	const router = useRouter();
	const addDocument = async () => {
		try {
			const room = await createDocument({ email, userId });

			if (room) {
				router.push(`documents/${room.id}`);
			}
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<Button
			className='gradient-blue flex gap-1 shadow-md'
			type='submit'
			onClick={addDocument}
		>
			<Image src={'/assets/icons/add.svg'} alt='add' width={24} height={24} />
			<p className='hidden sm:block'> Create a blank document</p>
		</Button>
	);
}
