"use client"

import { logout } from '@/actions/logout';
import { useCurrentUser } from '@/hooks/useCurrentUser';

const SettingsPage = () => {

	const session = useCurrentUser();
	const onClick = () => {
		logout();
	}


  return (
	<div className='bg-white p-10 rounded-xl'>
		<form onClick={onClick}>
			<button type='submit'>Sign Out</button>
		</form>
	</div>
  )
}

export default SettingsPage
