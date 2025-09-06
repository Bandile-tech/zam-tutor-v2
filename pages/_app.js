// pages/_app.js
import 'katex/dist/katex.min.css'; // KaTeX CSS for math rendering

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
