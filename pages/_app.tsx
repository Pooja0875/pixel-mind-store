import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const client = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const stop = () => setLoading(false);

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', stop);
    router.events.on('routeChangeError', stop);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', stop);
      router.events.off('routeChangeError', stop);
    };
  }, [router]);

  return (
    <QueryClientProvider client={client}>
      {loading && (
        <div style={styles.loaderOverlay}>
          <div style={styles.spinner}></div>
        </div>
      )}
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  loaderOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(255,255,255,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '6px solid #eee',
    borderTop: '6px solid #6b21a8',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

// Add global keyframes for spinner animation
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}


