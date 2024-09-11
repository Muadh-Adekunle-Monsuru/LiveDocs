'use client';
import React, { ReactNode } from 'react';
import {
	ClientSideSuspense,
	LiveblocksProvider,
} from '@liveblocks/react/suspense';
import Loader from '@/components/Loader';
import { getClerkUsers, getDocumentUsers } from '@/lib/actions/user.actions';
import { getAllDocuments } from '@/lib/actions/room.actions';
import { useUser } from '@clerk/nextjs';
export default function Provider({ children }: { children: ReactNode }) {
	const { user: clerkUser } = useUser();
	return (
		<LiveblocksProvider
			authEndpoint={'/api/liveblocks-auth'}
			resolveUsers={async ({ userIds }) => {
				const users = await getClerkUsers({ userIds });
				return users;
			}}
			resolveMentionSuggestions={async ({ text, roomId }) => {
				const roomUsers = await getDocumentUsers({
					roomId,
					currentUser: clerkUser?.emailAddresses[0].emailAddress!,
					text,
				});
				return roomUsers;
			}}
		>
			<ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
		</LiveblocksProvider>
	);
}
