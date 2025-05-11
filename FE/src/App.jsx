import { Outlet } from "react-router-dom";
import { Helmet } from 'react-helmet';

const App = () => {
  return (
    <div className="w-full">
      <Helmet>
        <title>Greenprobolinggo</title>
      </Helmet>
      <Outlet />
    </div>
  );
};
export default App
