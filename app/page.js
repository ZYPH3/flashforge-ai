'use client'
import Image from "next/image";
import getStripe from "@/utils/get.stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

export default function Home() {

  const handleSubmit = async (priceId) => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ priceId })
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <Container maxWidth="lg" disableGutters>
      <Head>
        <title>FlashForge</title>
        <meta name="description" content="Forge new knowledge from any content" />
      </Head>

      <AppBar position="static" sx={{ backgroundColor: '#FFFFFF', boxShadow: 'none', mb: 6 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#333333' }}>FlashForge</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in" sx={{ color: '#333333', textTransform: 'none' }}>Login</Button>
            <Button color="inherit" href="/sign-up" sx={{ color: '#333333', textTransform: 'none' }}>Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: 'center', my: 10, px: 4 }}>
        <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 'bold', color: '#333333', mb: 2 }}>Welcome to FlashForge</Typography>
        <Typography variant="h5" sx={{ fontSize: '1.5rem', color: '#555555', mb: 4 }}>
          Forge new knowledge from any content
        </Typography>
        <Button href="/generate" LinkComponent={Link} variant="contained" color="secondary" sx={{ px: 4, py: 1.5, borderRadius: '50px', fontWeight: 'bold' }}>
          Get Started
        </Button>
      </Box>

      <Box sx={{ my: 10, px: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333333', mb: 6, textAlign: 'center' }}>Features</Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 4, textAlign: 'center', borderRadius: 2, boxShadow: 3, backgroundColor: '#FFFFFF' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333333' }}>Easy Text Input</Typography>
              <Typography sx={{ color: '#555555' }}>
                Simply input your text and let our software do the rest. Creating flashcards has never been easier.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 4, textAlign: 'center', borderRadius: 2, boxShadow: 3, backgroundColor: '#FFFFFF' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333333' }}>Smart Flashcards</Typography>
              <Typography sx={{ color: '#555555' }}>
                Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 4, textAlign: 'center', borderRadius: 2, boxShadow: 3, backgroundColor: '#FFFFFF' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333333' }}>Accessible Anywhere</Typography>
              <Typography sx={{ color: '#555555' }}>
                Access your flashcards from any device, at any time. Study on the go with ease.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 10, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333333', mb: 6 }}>Pricing</Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 4,
              border: '1px solid',
              borderColor: '#E0E0E0',
              borderRadius: 2,
              backgroundColor: '#FFFFFF',
              boxShadow: 3,
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
              }
            }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333333' }}>Basic</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FF4081' }}>$2 / month</Typography>
              <Typography sx={{ color: '#555555' }}>
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" color="secondary" sx={{ mt: 2, borderRadius: '50px', px: 4 }} onClick={() => handleSubmit('price_1Basic')}>Choose Basic</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 4,
              border: '1px solid',
              borderColor: '#E0E0E0',
              borderRadius: 2,
              backgroundColor: '#FFFFFF',
              boxShadow: 3,
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
              }
            }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333333' }}>Pro</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FF4081' }}>$5 / month</Typography>
              <Typography sx={{ color: '#555555' }}>
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button variant="contained" color="secondary" sx={{ mt: 2, borderRadius: '50px', px: 4 }} onClick={() => handleSubmit('price_1Pro')}>Choose Pro</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
