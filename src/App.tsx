import "./style/index.css";
import { Header } from "./components/header";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./components/page/notFound";
import { LogIn } from "./components/page/logIn";
import { Main } from "./components/main";
import { Registration } from "./components/page/registration";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/operation";
import type { AppDispatch } from "./redux/store";
import { selectIsRefreshing } from "./redux/auth/selector";
import RestrictedRoute from "./components/restrictedRoute";
import Favorites from "./components/page/favorites";
import { getTeachers } from "./redux/teacher/operation";

const Home = lazy(() => import("./components/page/home"));
const TeacherCard = lazy(() => import("./components/page/teachers"));

function App() {
  const dispatsh = useDispatch<AppDispatch>();
  const isRefresh = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatsh(refreshUser());
    dispatsh(getTeachers());
  }, [dispatsh]);
  return isRefresh ? (
    <h1>Loading</h1>
  ) : (
    <>
      <Header />
      <Main>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teachers" element={<TeacherCard />} />

            <Route
              path="/login"
              element={<RestrictedRoute component={<LogIn />} redirectTo="/" />}
            />
            <Route
              path="/registration"
              element={
                <RestrictedRoute component={<Registration />} redirectTo="/" />
              }
            />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Main>
    </>
  );
}

export default App;
