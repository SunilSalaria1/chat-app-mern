import React from 'react';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import { IRoom } from '../../../shared/models';
import styled from '@emotion/styled';
import { Toolbar, Divider, Typography, List, ListItem, ListItemButton, Stack, Badge } from '@mui/material';
import { IActiveUser } from '../../../shared/layouts/AdminLayout';

function RoomsUser() {
	const roomsData = useLoaderData() as IRoom[];
	const activeUserContext = useOutletContext() as IActiveUser[];
	const Image = styled('img')(({ theme }) => ({
		height: '20px',
		width: '20px',
		borderRadius: 10
	}));
	return (
		<>
			<Toolbar>Users</Toolbar>
			<Divider />
			<Typography variant="subtitle2" pt={1} px={3}>
				Favorites
			</Typography>
			<List>
				<ListItem disablePadding sx={{ display: 'block' }}>
					{roomsData.map((el) =>
						el.members.map((user) => (
							<ListItemButton
								key={user._id}
								sx={{
									minHeight: 48,
									px: 2.5
								}}
							>
								<Stack direction={'row'}>
									<Badge sx={{'& .MuiBadge-dot':{top:'auto',bottom:'-1px',right:'1px'}}} color={activeUserContext.find((activeUser) => activeUser.userId === user._id) ?? '' ? 'success' : 'error'} variant={'dot'} >
										<Image
											src="https://doot-light.react.themesbrand.com/static/media/avatar-4.474927d6a33a7b8cde52.jpg"
											alt="loading"
										/>
									</Badge>
									<Typography variant="subtitle2" ml={2}>
										{user.firstName + ' ' + user.lastName}
									</Typography>
								</Stack>
							</ListItemButton>
						))
					)}
				</ListItem>
			</List>
		</>
	);
}

export default RoomsUser;
