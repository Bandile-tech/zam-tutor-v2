// pages/_app.js
import '../styles/globals.css';       // Tailwind + global CSS
import 'katex/dist/katex.min.css';    // KaTeX for math rendering
import { Analytics } from '@vercel/analytics/next';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      {process.env.NODE_ENV === 'production' && <Analytics />}
    </>
  );
}