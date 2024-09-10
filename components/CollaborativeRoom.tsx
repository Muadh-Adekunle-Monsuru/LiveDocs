'use client';
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense';
import React from 'react';
import Header from './Header';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Editor } from './editor/Editor';
import ActiveCollabs from './ActiveCollabs';

export default function CollaborativeRoom({
	roomId,
	roomMetadata,
}: CollaborativeRoomProps) {
	return (
		<RoomProvider id={roomId}>
			<ClientSideSuspense fallback={<div>Loading…</div>}>
				<div className='collaborative-room'>
					<Header>
						<div className='flex w-full items-center justify-center gap-2'>
							<p className='document-title'>Untitled</p>
						</div>
						<div className='flex w-full flex-1 justify-end gap-2'>
							<ActiveCollabs />
							<SignedOut>
								<SignInButton />
							</SignedOut>
							<SignedIn>
								<UserButton />
							</SignedIn>
						</div>
					</Header>
					<Editor />
				</div>
			</ClientSideSuspense>
		</RoomProvider>
	);
}
