import React, { useState } from 'react';
import { ChangePassword } from './ChangePassword';
import { UpdateProfile } from './UpdateProfile';

export const Settings = () => {
	const [activeTab, setActiveTab] = useState('Change Password');
	const handleTabClick = (tabName) => {
		setActiveTab(tabName);
	};
	return (
		<>
			<div className='flex flex-col py-10 px-20 min-h-screen text-black w-full gap-5'>
				<div className='flex items-center justify-between'>
					<div className='text-2xl'>Settings</div>
					<div className='max-w-xs text-lg breadcrumbs'>
						<ul>
							<li>Dashboard</li>
							<li>Settings</li>
						</ul>
					</div>
				</div>
				<div className='flex flex-col md:flex-row lg:flex-row mb-4 '>
					{['Change Password'].map((tab) => (
						<button
							key={tab}
							className={`inline-block p-4 border-b-2 rounded-t-lg ${
								activeTab === tab
									? 'border-purple-600 text-purple-600'
									: 'text-black'
							} `}
							onClick={() => handleTabClick(tab)}
						>
							{tab.charAt(0).toUpperCase() + tab.slice(1)}
						</button>
					))}
				</div>

				<div className='p-4 rounded-lg  bg-white'>
					{/* {activeTab === 'Update Profile' && (
						<>
							<UpdateProfile />
						</>
					)} */}
					{activeTab === 'Change Password' && (
						<>
							<ChangePassword />
						</>
					)}
				</div>
			</div>
		</>
	);
};
