'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Box, CircularProgress, Container, Typography } from "@mui/material";

const ResultPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const session_id = searchParams.get('session_id');

    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if (!session_id) return;

            try {
                const res = await fetch(`/app/checkout_session?session_id=${session_id}`);
                const sessionData = await res.json();
                if (res.ok) {
                    setSession(sessionData);
                } else {
                    setError(sessionData.error);
                }
            } catch (err) {
                setError('An error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchCheckoutSession();
    }, [session_id]);

    if (loading) {
        return (
            <Container maxWidth="xs" sx={{ textAlign: 'center', mt: 4 }}>
                <CircularProgress sx={{ mb: 2 }} />
                <Typography variant="h6" sx={{ color: '#333' }}>
                    Loading...
                </Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="xs" sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h6" sx={{ color: 'red' }}>
                    {error}
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="xs" sx={{ textAlign: 'center', mt: 4 }}>
            {session.payment_status === 'paid' ? (
                <>
                    <Typography variant="h4" sx={{ mb: 2, color: '#4CAF50' }}>
                        Thank you for your purchase
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1" sx={{ color: '#555' }}>
                            Session ID: {session_id}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            We have received your payment. You will receive an email with the order details shortly.
                        </Typography>
                    </Box>
                </>
            ) : (
                <>
                    <Typography variant="h4" sx={{ mb: 2, color: 'red' }}>
                        Payment Failed
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1" sx={{ color: '#555' }}>
                            Your payment was not successful. Please try again.
                        </Typography>
                    </Box>
                </>
            )}
        </Container>
    );
};

export default ResultPage;
