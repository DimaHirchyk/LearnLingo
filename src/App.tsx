import "./style/index.css";
import { Header } from "./components/header";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/page/home";
import { NotFound } from "./components/page/notFound";
import { LogIn } from "./components/page/logIn";
import { Main } from "./components/main";
import { Registration } from "./components/page/registration";
import { TeacherCard } from "./components/page/teachers";

function App() {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teachers" element={<TeacherCard />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
