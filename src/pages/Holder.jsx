import { Outlet, useNavigation } from "react-router-dom";

import Header from "../components/Header";
import Spinner from "../components/Spinner";

function Holder() {
  const navigation = useNavigation();

  return (
    <>
      <Header />
      {navigation.state !== "idle" ? <Spinner /> : <Outlet />}
    </>
  );
}

export default Holder;
