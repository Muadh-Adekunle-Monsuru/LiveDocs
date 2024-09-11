'use client';
import { updateDocument } from '@/lib/actions/room.actions';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense';
import { SquarePen } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import ActiveCollabs from './ActiveCollabs';
import { Editor } from './editor/Editor';
import Header from './Header';
import Loader from './Loader';
import ShareModal from './ShareModal';
import { Input } from './ui/input';

export default function CollaborativeRoom({
	roomId,
	roomMetadata,
	currentUserType,
	users,
}: CollaborativeRoomProps) {
	const [editing, setEditing] = useState(false);
	const [loading, setLoading] = useState(false);
	const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);

	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const updateTitle = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key == 'Enter') {
			setLoading(true);
			try {
				if (documentTitle !== roomMetadata.title) {
					const updatedDocument = await updateDocument(roomId, documentTitle);

					if (updatedDocument) {
						setEditing(false);
					}
				}
			} catch (e) {
				console.log(e);
			}

			setLoading(false);
		}
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				setEditing(false);
				updateDocument(roomId, documentTitle);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [documentTitle, roomId]);

	useEffect(() => {
		if (editing && inputRef.current) {
			inputRef.current.focus();
		}
	}, [editing]);
	return (
		<RoomProvider id={roomId}>
			<ClientSideSuspense fallback={<Loader />}>
				<div className='collaborative-room'>
					<Header>
						<div
							ref={containerRef}
							className='flex mx-auto w-full items-center justify-center gap-2'
						>
							{editing && !loading ? (
								<Input
									type='text'
									value={documentTitle}
									ref={inputRef}
									placeholder='Enter title'
									onChange={(e) => setDocumentTitle(e.target.value)}
									onKeyDown={updateTitle}
									disabled={!editing}
									className='document-title-input'
								/>
							) : (
								<>
									<p className='document-title cursor-default'>
										{documentTitle}
									</p>
								</>
							)}
							{currentUserType === 'editor' && !editing && (
								<SquarePen
									className='size-4 cursor-pointer text-gray-400'
									onClick={() => setEditing(true)}
								/>
							)}

							{currentUserType !== 'editor' && !editing && (
								<p className='view-only-tag'>View Only</p>
							)}

							{loading && <p className='text-sm text-gray-400'>Saving...</p>}
						</div>
						<div className='flex w-full flex-1 justify-end gap-2'>
							<ActiveCollabs />
							<ShareModal
								roomId={roomId}
								collaborators={users}
								creatorId={roomMetadata.creatorId}
								currentUserType={currentUserType}
							/>
							<SignedOut>
								<SignInButton />
							</SignedOut>
							<SignedIn>
								<UserButton />
							</SignedIn>
						</div>
					</Header>
					<Editor roomId={roomId} currentUserType={currentUserType} />
				</div>
			</ClientSideSuspense>
		</RoomProvider>
	);
}
