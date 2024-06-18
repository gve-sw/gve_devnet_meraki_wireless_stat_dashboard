import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';

const Header = () => {
    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: '#00A74A', // Update this to your green color
                color: '#fff', // Ensure text color contrasts well
                py: 3, // Vertical padding
                textAlign: 'center',
                boxShadow: '0px 2px 5px rgba(0,0,0,0.1)', // Subtle shadow for depth
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: (theme) => theme.zIndex.appBar - 1, // Make sure it is below the app bar
            }}
        >
            <Container maxWidth="lg">
                <Grid container alignItems="center" justifyContent="center">
                    <Grid item>
                        <Box
                            sx={{ height: 40, marginRight: 2 }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" component="div">
                            Meraki Administrative Dashboard
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Header;