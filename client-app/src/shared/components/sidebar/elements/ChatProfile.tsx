import styled from '@emotion/styled';
import { Box, Divider, Paper, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react';
import {Person,Email,LocationOn} from '@mui/icons-material';
import { IUser } from '../../../models';

function ChatProfile({currentUser}:{currentUser:IUser}) {
	const Image = styled('img')(() => ({}));
	return (
		<>
			<Toolbar sx={{ mb: 5 }}>
				<Typography
					sx={{ position: 'relative', zIndex: 1 }}
					variant="subtitle1"
					color={(theme) => theme.palette.common.white}
				>
					Profile
				</Typography>
				<Box position="absolute" left="0px" width="100%">
					<img
						src="https://doot-light.react.themesbrand.com/static/media/img-4.8111c4656c8bc3b62569.jpg"
						alt="loading"
						height="180px"
						width="100%"
					/>
				</Box>
			</Toolbar>
			<Paper
				elevation={5}
				sx={{
					position: 'relative',
					display: 'block',
					marginLeft: 'auto',
					marginRight: 'auto',
					bottom: '20px',
					height: '60px',
					width: '60px',
					borderRadius: 100,
					outline: '3px solid white',
					overflow: 'hidden',
				}}
			>
				<Image
					src="https://doot-light.react.themesbrand.com/static/media/avatar-1.9c8e605558cece65b06c.jpg"
					height="60px"
					width="60px"
					alt="loading"
				/>
			</Paper>
			<Box textAlign={'center'}>
				<Typography variant="h6">{currentUser.firstName}</Typography>
				<Typography variant="subtitle2" paragraph>
					Frontend Developer
				</Typography>
        <Divider/>
        <Stack p={3} gap={2}>
          <Box display={'flex'} gap={1}><Person sx={{flexBasis:'10%',color:(theme)=>theme.palette.mode === 'light' ? theme.palette.grey[800] : theme.palette.common.white}}/> {currentUser.firstName + " " + currentUser.lastName}</Box>
          <Box display={'flex'} gap={1}><Email sx={{flexBasis:'10%',color:(theme)=>theme.palette.mode === 'light' ? theme.palette.grey[800] : theme.palette.common.white}}/> {currentUser.email}</Box>
          <Box display={'flex'} gap={1}><LocationOn sx={{flexBasis:'10%',color:(theme)=>theme.palette.mode === 'light' ? theme.palette.grey[800] : theme.palette.common.white}}/> California, USA</Box>
        </Stack>
			</Box>
		</>
	);
}

export default ChatProfile;
