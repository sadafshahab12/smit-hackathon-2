import { BrowserRouter, Routes, Route } from "react-router-dom";
import StdFeedback from "./pages/StdFeedback";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ThankYou from "./pages/ThankYou";
function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<StdFeedback />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
