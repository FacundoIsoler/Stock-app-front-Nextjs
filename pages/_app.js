import { StoreProvider } from "@/store/StoreProvider";
import "@/styles/globals.css";


export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />;
    </StoreProvider>
  )
}
