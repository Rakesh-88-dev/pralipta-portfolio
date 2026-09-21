import Home from "./pages/Home";
import { LenisProvider } from "./hooks/useLenis";

function App() {
  return (
    <LenisProvider>
      <Home />
    </LenisProvider>
  );
}

export default App;