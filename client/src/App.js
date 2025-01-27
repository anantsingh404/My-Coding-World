import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Setting from "./components/core/Dashboard/Setting/Index";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/Index";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse/Index";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/Index";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Contact from "./pages/Contact";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import LogTable from "./components/core/Dashboard/LogTable";

function App() {
    const { user } = useSelector((state) => state.profile);

    return (
        <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog/:catalogName" element={<Catalog />} />
                <Route path="/courses/:courseId" element={<CourseDetails />} />
                <Route path="/contact" element={<Contact/>}/>
                <Route
                    element={
                        <PrivateRoute>
                            <ViewCourse />
                        </PrivateRoute>
                    }
                >
                    {
                        user?.accountType === ACCOUNT_TYPE.STUDENT && (
                            <>
                                <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                                element={<VideoDetails/>}
                                />
                            </>
                        )
                    }
                </Route>
                <Route
                    path="/login"
                    element={
                        <OpenRoute>
                            <Login />
                        </OpenRoute>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <OpenRoute>
                            <Signup />
                        </OpenRoute>
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <OpenRoute>
                            <ForgotPassword />
                        </OpenRoute>
                    }
                />
                <Route
                    path="/update-password/:id"
                    element={
                        <OpenRoute>
                            <UpdatePassword />
                        </OpenRoute>
                    }
                />
                <Route
                    path="/verify-email"
                    element={
                        <OpenRoute>
                            <VerifyEmail />
                        </OpenRoute>
                    }
                />
                <Route path="/about" element={<About />} />

                <Route
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                >
                    <Route
                        path="/dashboard/my-profile"
                        element={<MyProfile />}
                    />
                    <Route path="/dashboard/settings" element={<Setting />} />
                    {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                        <>
                            <Route
                                path="/dashboard/enrolled-courses"
                                element={<EnrolledCourses />}
                            />
                            <Route path="/dashboard/cart" element={<Cart />} />
                        </>
                    )}
                    {user?.accountType === ACCOUNT_TYPE.ADMIN && (
                        <>
                            <Route
                                path="/dashboard/logs"
                                element={<LogTable />}
                            />
                        </>
                    )}

                    {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                        <>
                            <Route path="/dashboard/instructor" element={<Instructor/>}/>
                            <Route
                                path="/dashboard/add-course"
                                element={<AddCourse />}
                            />
                            <Route
                                path="/dashboard/my-courses"
                                element={<MyCourses />}
                            />
                            <Route
                                path="/dashboard/edit-course/:courseId"
                                element={<EditCourse />}
                            />
                        </>
                    )}
                </Route>

                <Route path="*" element={<Error />} />
            </Routes>
        </div>
    );
}

export default App;
