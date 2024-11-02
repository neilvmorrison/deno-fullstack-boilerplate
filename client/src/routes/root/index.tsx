import { Outlet } from "npm:react-router-dom";
import Navbar from "../../shared-components/Navbar.tsx";

export default function Root() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
