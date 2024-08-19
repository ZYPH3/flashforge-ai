"use client";
import { SignIn } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Toolbar, Typography, CssBaseline } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

export default function SignInPage() {
    return (
        <Container maxWidth="xs" disableGutters>
            <Head>
                <title>Sign In - FlashForge</title>
            </Head>
            <CssBaseline />
            <AppBar position="static" sx={{ boxShadow: 'none', bgcolor: 'background.paper' }}>
                <Toolbar sx={{ justifyContent: 'center' }}>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>FlashForge</Typography>
                </Toolbar>
            </AppBar>
            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center" 
                sx={{ minHeight: '100vh', p: 4 }}
            >
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#333333' }}>
                    Sign In
                </Typography>
                <SignIn />
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ textAlign: 'center' }}>
                        Don't have an account?{' '}
                        <Link href="/sign-up" passHref>
                            <Button color="primary" sx={{ textTransform: 'none' }}>
                                Sign Up
                            </Button>
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}
