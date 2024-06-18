import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: '#00A74A', // Update this to your green color
                color: '#fff', // Ensure text color contrasts well
                py: 3, // Vertical padding
                textAlign: 'center',
                mt: 'auto',
                boxShadow: '0px -2px 5px rgba(0,0,0,0.1)', // Subtle shadow for depth
            }}
            component="footer"
        >
            <Container maxWidth="lg">
                <Typography variant="body1">
                    GVE Devnet
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;