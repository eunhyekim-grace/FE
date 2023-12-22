import React from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";


const Simple = React.lazy(() => import("pages/Simple"));
const SignupPageLight = React.lazy(() => import("pages/SignupPageLight"));
const FrontpageLight = React.lazy(() => import("pages/FrontpageLight"));
const Light = React.lazy(() => import("pages/Light"));
const FamilyHomeLight = React.lazy(() => import("pages/FamilyHomeLight/recpage"));
const LoginPageLight = React.lazy(() => import("pages/LoginPageLight/l_login"));
const ChartLight = React.lazy(() => import("pages/ChartLight/index"));
const SpeechLight = React.lazy(() => import("pages/SpeechLight/speech"));


const ProjectRoutes = () => {

  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPageLight />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/familyhomelight" element={<FamilyHomeLight />} />
          <Route path="/frontpagelight" element={<FrontpageLight />} />
          <Route path="/signuppagelight" element={<SignupPageLight />} />
          <Route path="/simple" element={<Simple />} />
          <Route path="/dhiwise-dashboard" element={<Home />} />
          <Route path="/Light/:programId" element={<Light />} />
          <Route path="/chart_sample" element= {<ChartLight/>}  />
          <Route path="/speech_test" element={<SpeechLight/>} />

        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
