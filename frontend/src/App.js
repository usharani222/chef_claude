import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import "./styles/theme.css";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Header />
      {token ? <Dashboard /> : <AuthPage />}
    </>
  );
}

export default App;
