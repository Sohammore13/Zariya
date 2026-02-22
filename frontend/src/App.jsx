import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import LandingPage from "./pages/LandingPage";
import { useAuthStore } from "./store/useAuthStore";
import { useCallStore } from "./store/useCallStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import IncomingCallModal from "./components/IncomingCallModal";
import ActiveCallUI from "./components/ActiveCallUI";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth, authUser, socket } = useAuthStore();
  const { setIncomingCall, handleCallAccepted, handleIceCandidate, endCall } = useCallStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // ── Wire up all call-related socket events ───────────────────────────────────
  useEffect(() => {
    if (!socket) return;

    // Someone is calling us
    socket.on("call:incoming", (data) => {
      setIncomingCall(data); // { callerId, callerName, callerPic, offer }
    });

    // Caller: the callee accepted, we now have their SDP answer
    socket.on("call:accepted", ({ answer }) => {
      handleCallAccepted(answer);
    });

    // Caller: the callee rejected
    socket.on("call:rejected", () => {
      toast.error("Call was declined.");
      endCall();
    });

    // Either side: the other person hung up
    socket.on("call:ended", () => {
      toast("Call ended.", { icon: "📵" });
      endCall();
    });

    // Relay ICE candidates to build the peer connection
    socket.on("webrtc:ice-candidate", ({ candidate }) => {
      handleIceCandidate(candidate);
    });

    return () => {
      socket.off("call:incoming");
      socket.off("call:accepted");
      socket.off("call:rejected");
      socket.off("call:ended");
      socket.off("webrtc:ice-candidate");
    };
  }, [socket, setIncomingCall, handleCallAccepted, handleIceCandidate, endCall]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - SUBTLE LIGHT BLOBS */}
      <div className="absolute top-0 -left-4 size-96 bg-indigo-200 opacity-30 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 -right-4 size-96 bg-violet-200 opacity-30 blur-[120px] rounded-full" />

      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/landing"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
      </Routes>

      {/* Global call UI — rendered above all other content */}
      <IncomingCallModal />
      <ActiveCallUI />

      <Toaster />
    </div>
  );
}
export default App;

