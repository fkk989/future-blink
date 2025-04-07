import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Redirect from "./components/Redirect";
import LoginPage from "./components/pages/auth/Login";
import SignupPage from "./components/pages/auth/Signup";
import { Layout } from "./components/Layout";
import { ListPage } from "./components/pages/list/ListPage";
import { EditListPage } from "./components/pages/list/EditList";
import { EditEmailPage } from "./components/pages/email/EditEmail";
import { EmailPage } from "./components/pages/email/EmailPage";
import { SequencePage } from "./components/pages/sequence/SequencePage";
import { SequenceDetails } from "./components/pages/sequence/SequenceDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          index
          path="/sequence"
          element={
            <Layout isAuthenticatedRoute={true}>
              <SequencePage />
            </Layout>
          }
        />
        <Route
          path="/sequence/:id"
          element={
            <Layout isAuthenticatedRoute={true}>
              <SequenceDetails />
            </Layout>
          }
        />
        <Route
          path="/email-template"
          element={
            <Layout isAuthenticatedRoute={true}>
              <EmailPage />
            </Layout>
          }
        />
        <Route
          path="/email-template/:id"
          element={
            <Layout isAuthenticatedRoute={true}>
              <EditEmailPage />
            </Layout>
          }
        />
        <Route
          path="/list"
          element={
            <Layout isAuthenticatedRoute={true}>
              <ListPage />
            </Layout>
          }
        />
        <Route
          path="/list/:id"
          element={
            <Layout isAuthenticatedRoute={true}>
              <EditListPage />
            </Layout>
          }
        />
        <Route path="*" element={<Redirect />} />
      </Routes>
    </Router>
  );
}

export default App;
