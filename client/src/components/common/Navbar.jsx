import React, { useEffect, useState } from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    // FOR TESTING CHANGE totalItems from "const" to "let"
    // totalItems = 1
    const [subLinks, setSubLinks] = useState([]);
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const fetchSubLinks = async () => {
        setLoading(true);
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result?.data?.data);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSubLinks();
    }, []);

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    return (
        <div className="h-14 w-full border-b border-richblack-700 bg-richblack-900 flex justify-center items-center">
            <div className="w-11/12 flex justify-between px-[70px] items-center h-8">
                <Link to="/">
                    <p className=" text-richblack-5 text-2xl font-bold font-[cursive]">
                        <span className=" text-yellow-50">Edu</span>Nxt
                    </p>
                    {/* <img
                        src={logoFullLight}
                        alt="Logo"
                        width="160px"
                        height="32px"
                    /> */}
                </Link>
                <div className="text-base text-richblack-25">
                    <ul className="flex flex-row gap-5">
                        {NavbarLinks.map((link, index) => {
                            return (
                                <li key={index}>
                                    {link.title === "Catalog" ? (
                                        <div className="group cursor-pointer flex flex-row items-center justify-center relative">
                                            <p>{link.title}</p>
                                            <IoMdArrowDropdown />
                                            <div className="invisible absolute left-[50%] -top-[10%] flex flex-col gap-3 rounded-md bg-richblack-5 px-4 py-2 text-richblack-900 opacity-0 transition-all group-hover:visible group-hover:opacity-100 lg:w-[250px] translate-x-[-50%] translate-y-[3em] group-hover:translate-y-[1.65em] z-10">
                                                <div className="absolute left-[50%] translate-y-[-10%] translate-x-[72%] top-0 h-6 w-6 rotate-45 -z-10 select-none bg-richblack-5"></div>
                                                {loading ? (
                                                    <p>Loading...</p>
                                                ) : subLinks.length > 0 ? (
                                                    <>
                                                        {subLinks
                                                            ?.filter(
                                                                (subLink) =>
                                                                    subLink
                                                                        ?.courses
                                                                        ?.length >
                                                                    0
                                                            )
                                                            ?.map(
                                                                (
                                                                    subLink,
                                                                    i
                                                                ) => (
                                                                    <Link
                                                                        to={`/catalog/${subLink.name
                                                                            .replace(
                                                                                " ",
                                                                                "-"
                                                                            )
                                                                            .toLowerCase()}`}
                                                                        key={i}
                                                                    >
                                                                        <p>
                                                                            {
                                                                                subLink.name
                                                                            }
                                                                        </p>
                                                                    </Link>
                                                                )
                                                            )}
                                                    </>
                                                ) : (
                                                    <div>
                                                        No options available
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <Link to={link?.path}>
                                            <p
                                                className={`${
                                                    matchRoute(link?.path)
                                                        ? "text-yellow-25"
                                                        : "text-richblack-25"
                                                }`}
                                            >
                                                {link.title}
                                            </p>
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Login/SignUp/Dashboard */}

                <div className="flex flex-row items-center gap-6">
                    {
                        //Cart is only available for Students and userType[2] consists of type="student"
                        // FOR CHECKING: userType[2].type === "student" &&
                        user && user?.accountType === ACCOUNT_TYPE.STUDENT && (
                            <Link
                                to="/dashboard/cart"
                                className="relative text-richblack-5 hover:text-richblack-100 text-[22px]"
                            >
                                <AiOutlineShoppingCart />
                                {totalItems > 0 ? (
                                    <div className="text-richblack-5 bg-pink-300 rounded-full flex items-center justify-center h-3 w-3 absolute text-[10px] -top-1 -right-1">
                                        {totalItems}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </Link>
                        )
                    }

                    {token === null && (
                        <div className="flex flex-row gap-4">
                            <Link
                                to={"/login"}
                                className="px-3 py-2 rounded-lg text-richblack-100 border border-richblack-700 bg-richblack-800"
                            >
                                Log in
                            </Link>
                            <Link
                                to={"/signup"}
                                className="px-3 py-2 rounded-lg text-richblack-100 border border-richblack-700 bg-richblack-800"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                    {token != null && <ProfileDropdown />}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
