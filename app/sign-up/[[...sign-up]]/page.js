"use client";
import { SignIn, SignUp } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Toolbar, Typography, CssBaseline } from "@mui/material";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <Container maxWidth="xs" disableGutters>
            <CssBaseline />
            <AppBar position="static" sx={{ boxShadow: 'none', bgcolor: 'background.paper' }}>
                <Toolbar sx={{ justifyContent: 'center' }}>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        FlashForge
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center" 
                sx={{ minHeight: '100vh', p: 4 }}
            >
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#333' }}>
                    Sign Up
                </Typography>
                <SignUp />
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ textAlign: 'center' }}>
                        Already have an account?{' '}
                        <Link href="/sign-in" passHref>
                            <Button color="primary" sx={{ textTransform: 'none' }}>
                                Login
                            </Button>
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}
