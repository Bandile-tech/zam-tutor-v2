// pages/_app.js
import 'katex/dist/katex.min.css'; // KaTeX CSS for math rendering
import { Analytics } from '@vercel/analytics/next';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
