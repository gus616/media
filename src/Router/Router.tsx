import { Navigate, Route, Routes } from "react-router";
import Login from "../Auth/Pages/Login";
import Users from "../Users/Pages/Users";
import { useAppSelector } from "../hooks/hooks";
import SignUp from "../Auth/Pages/SignUp";


type ProtectedRouteProps = {
  component: React.ComponentType;
}

export const Router = () => {

  const token = useAppSelector(state => state.auth.token);

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({component: Component}) => {
    return token ? <Component /> : <Navigate to="/" replace />
  };

  return (

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/users" element={<ProtectedRoute component={Users} />} />
    </Routes>
  );
};