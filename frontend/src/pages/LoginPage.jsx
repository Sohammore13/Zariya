import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageCircleIcon, MailIcon, LoaderIcon, LockIcon } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="w-full flex flex-col md:flex-row">

          {/* FORM COLUMN - LEFT SIDE */}
          <div className="md:w-1/2 p-10 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
            <div className="w-full max-w-md">

              {/* HEADING */}
              <div className="text-center mb-8">
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-indigo-100">
                  <MessageCircleIcon className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h2>
                <p className="text-gray-400 text-sm">Login to access your account</p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="johndoe@gmail.com"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-xl transition shadow-sm"
                >
                  {isLoggingIn ? (
                    <LoaderIcon className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link to="/signup" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition">
                  Don't have an account? Sign Up
                </Link>
              </div>
            </div>
          </div>

          {/* ILLUSTRATION - RIGHT SIDE */}
          <div className="hidden md:w-1/2 md:flex items-center justify-center p-10 bg-gray-50">
            <div className="text-center">
              <img
                src="/login.png"
                alt="People using mobile devices"
                className="w-full h-auto object-contain"
              />
              <h3 className="mt-6 text-xl font-semibold text-gray-800">Welcome to Zariya</h3>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;