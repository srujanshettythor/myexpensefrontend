import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import bg from "./img/avatar.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import { useGlobalContext } from "./context/globalContext";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCMO1BXsi9Whg4RxdbCVKp8stko7ZGkrr8",
  authDomain: "expensetracket-55b0e.firebaseapp.com",
  projectId: "expensetracket-55b0e",
  storageBucket: "expensetracket-55b0e.appspot.com",
  messagingSenderId: "374406729338",
  appId: "1:374406729338:web:48714c203c7738d8f035c3",
  measurementId: "G-M739MW4V4H",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

function App() {
  const [active, setActive] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during sign-out:", error.message);
    }
  };

  const displayData = () => {
    if (!isAuthenticated) {
      return (
        <AuthContainer>
          <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
          {error && <ErrorText>{error}</ErrorText>}
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Button onClick={isSignUp ? handleSignUp : handleSignIn}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
          </Button>
        </AuthContainer>
      );
    }

    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => <Orb />, []);

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        {isAuthenticated && (
          <>
            <Navigation
              active={active}
              setActive={setActive}
              handleSignOut={handleSignOut}
            />
            <button
              onClick={handleSignOut}
              style={{ display: "none" }}
            ></button>{" "}
            {/* Hidden sign out button for fallback */}
          </>
        )}
        <main>{displayData()}</main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Input = styled.input`
  width: 80%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  width: 80%;
  padding: 0.75rem;
  background-color: #6c5ce7;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    background-color: #5a4bcf;
  }
`;

const ErrorText = styled.p`
  color: red;
`;

export default App;
