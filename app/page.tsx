import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<div className='min-h-screen bg-black'>
			<div className='flex items-center justify-between py-5 fixed top-0 w-full backdrop-blur-[1px] bg-black/30 left-0 lg:px-14 text-white z-20'>
				<Link href='/'>
					<Image
						src={'/assets/icons/logo.svg'}
						alt='Logo'
						width={120}
						height={32}
						className='hidden md:block'
					/>
					<Image
						src={'/assets/icons/logo-icon.svg'}
						alt='Logo'
						width={32}
						height={32}
						className='md:hidden'
					/>
				</Link>
				<SignedIn>
					<Button asChild>
						<Link href={'/dashboard'}>Dashboard</Link>
					</Button>
				</SignedIn>
				<SignedOut>
					<Button asChild>
						<Link href={'/dashboard'}>Sign in</Link>
					</Button>
				</SignedOut>
			</div>
			<div className=' w-full h-screen absolute top-0 left-0 -z-0 background-div' />
			<div className='flex flex-col h-screen w-full justify-center items-center overflow-hidden text-white blur-[0.4px] gap-7'>
				<h1 className='pt-20 lg:text-[83px] text-3xl leading-none tracking-tighter font-semibold text-center w-2/3 text-gray-300'>
					Build collaborative experiences faster
				</h1>
				<div className='lg:w-1/2 px-3 text-center text-lg lg:text-xl text-gray-500'>
					<span>Shipped with features like</span>

					<div className='inline items-center mx-2 text-nowrap'>
						<Image
							src={'/comments.webp'}
							height={20}
							width={20}
							alt='comment'
							className='inline-block align-middle mx-1'
						/>
						<span className='text-white text-medium'>Comments,</span>
					</div>

					<div className='inline items-center mx-2 text-nowrap'>
						<Image
							src={'/notifications.webp'}
							height={20}
							width={20}
							alt='notifications'
							className='inline-block align-middle mx-1'
						/>
						<span className='text-white text-medium'>Notifications,</span>
					</div>

					<span>a</span>

					<div className='inline items-center mx-2 text-nowrap'>
						<Image
							src={'/text-editor.webp'}
							height={20}
							width={20}
							alt='text editor'
							className='inline-block align-middle mx-1'
						/>
						<span className='text-white text-medium'>Text Editor,</span>
					</div>

					<span>to build any collaborative experience with</span>

					<div className='inline items-center mx-2 text-nowrap'>
						<Image
							src={'/realtime-apis.webp'}
							height={20}
							width={20}
							alt='realtime'
							className='inline-block align-middle mx-1'
						/>
						<span className='text-white text-medium'>Realtime</span>
					</div>

					<span>integration from anywhere.</span>
				</div>
				<Button className='group flex items-center justify-between' asChild>
					<Link href={'/dashboard'}>
						<span>Start Writing</span>
						<ArrowRight className='size-4 group-hover:ml-2' />
					</Link>
				</Button>
			</div>
			<div className='grid grid-cols-3 grid-rows-3 lg:grid-rows-2 h-full blur-[0.3px]'>
				<div className='border lg:row-span-2 row-span-3 border-gray-800 rounded-3xl p-2 lg:p-10 m-1'>
					<Image
						src={'/comments.webp'}
						height={100}
						width={100}
						alt='comment'
						className='pb-5'
					/>
					<p className='text-xl font-semibold'>Comments </p>
					<p className='text-sm text-gray-400'>
						Enable feedback in your document.
					</p>
				</div>
				<div className='h-56 border border-gray-800 col-span-2 lg:col-span-1 rounded-3xl p-2 lg:p-10 m-1'>
					<Image
						src={'/notifications.webp'}
						height={70}
						width={70}
						alt='comment'
					/>
					<p className='text-xl font-semibold'>Notifications</p>
					<p className='text-sm text-gray-400'>
						The notifications systems for collaboration.
					</p>
				</div>
				<div className='h-56 border border-gray-800  col-span-2 lg:col-span-1 rounded-3xl p-2 lg:p-10 m-1'>
					<Image
						src={'/text-editor.webp'}
						height={70}
						width={70}
						alt='comment'
					/>
					<p className='text-xl font-semibold'>Text Editor</p>
					<p className='text-sm text-gray-400'>
						The collaborative text editor.
					</p>
				</div>
				<div className='h-56 border col-span-2 border-gray-800 rounded-3xl p-2 lg:p-10 m-1'>
					<Image
						src={'/realtime-apis.webp'}
						height={80}
						width={80}
						alt='comment'
					/>
					<p className='text-xl font-semibold'>Realtime Collaboration</p>
					<p className='text-sm text-gray-400'>
						The collaborative text editor.
					</p>
				</div>
			</div>
		</div>
	);
}
