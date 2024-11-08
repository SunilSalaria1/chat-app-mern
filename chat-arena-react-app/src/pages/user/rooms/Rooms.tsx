import { Toolbar, Divider, Typography, List, ListItem, ListItemButton, Stack, styled } from '@mui/material';
import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { IRoom } from '../../../shared/models';

function Rooms() {
	const roomsData = useLoaderData() as IRoom[];
	const Image = styled('img')(({ theme }) => ({
		height: '20px',
		width: '20px',
		borderRadius: 10
	}));

	return (
		<>
			<Toolbar>Rooms</Toolbar>
			<Divider />
			<Typography variant="subtitle2" pt={1} px={3}>
				Favorites
			</Typography>
			<List>
				<ListItem disablePadding sx={{ display: 'block' }}>
					{roomsData.map((el) => (
						<ListItemButton
							key={el._id}
							sx={{
								minHeight: 48,
								px: 2.5
							}}
							component={Link}
							to={el._id}
						>
							<Stack direction={'row'}>
								<Image
									src="https://doot-light.react.themesbrand.com/static/media/avatar-4.474927d6a33a7b8cde52.jpg"
									alt="loading"
								/>
								<Typography variant="subtitle2" ml={2}>
									{el.name}
								</Typography>
							</Stack>
						</ListItemButton>
					))}
				</ListItem>
			</List>
		</>
	);
}

export default Rooms;
