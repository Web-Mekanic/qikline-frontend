import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

export default function Home() {
  return (
		<>
      <Header />
			<section>
				<div className='space-y-6 mt-20'>
					<h1 className='text-5xl font-bold text-center max-w-[450px] mx-auto leading-16'>
						<span className='text-blue-700'>Book</span> Local Services in Minutes
					</h1>

					<p className='text-center  text-gray-700 max-w-[570px] mx-auto'>
						Skip the wait. Discover businesses near you and book
						appointments instantly, no calls, no stress.
					</p>
					<div className='flex items-center gap-x-5 justify-center'>
						<Button
							variant='outline'
							className='text-lg text-white bg-blue-700 w-[18rem] transition-all duration-300 hover:bg-blue-800 hover:text-white h-12  font-medium'
							size='lg'
						>
							Find a Service
						</Button>
						<Button
							variant='outline'
							className=' text-lg text-blue-700 font-medium w-[18rem] transition-all duration-300 hover:bg-blue-700 hover:text-white border border-blue-700 h-12 px-10'
							size='lg'
						>
							List Your Business
						</Button>
					</div>
				</div>
			</section>
		</>
  );
}
