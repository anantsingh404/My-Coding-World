import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { RxCross2, RxPlus } from "react-icons/rx";
import ChatModalQuesAns from "./ChatModalQuesAns";
import { transcribeEndpoints } from "../../../services/apis";
import { openAIEndpoints } from "../../../services/apis";
import { apiConnector } from "../../../services/apiconnector";
import LoadingSpinner from "../../common/LoadingSpinner";

const ChatModal = ({ showChatModal, setShowChatModal, lectureURL }) => {
    const [query, setQuery] = useState("");
    const [conversations, setConversations] = useState([]);
    const [initialContent, setInitialContent] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setInitialContent("");
        setShowChatModal(false);
    }, [lectureURL]);

    const handleSubmit = async () => {
        if (loading === true) return;
        // API call for GPT
        const updatedConversations = [
            ...conversations,
            { role: "user", content: query },
        ];
        setQuery("");
        setConversations(updatedConversations);
        const response = await apiConnector("POST", openAIEndpoints.CHAT_API, {
            content: initialContent,
            messages: updatedConversations,
        });
        console.log("output:", response);

        setConversations([
            ...updatedConversations,
            {
                role: "assistant",
                content: response.data.answer[0].message.content,
            },
        ]);
    };
    const modalOpen = async () => {
        setShowChatModal(!showChatModal);
        if (initialContent === "") {
            setLoading(true);
            const response = await apiConnector(
                "POST",
                transcribeEndpoints.TRANSCRIBE_API,
                { videoUrl: lectureURL }
            );
            setInitialContent(response.data.data);
            setLoading(false);
        }
    };
    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleDownload = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/openai/download`
        );
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", "file.pdf"); // any name for the downloaded file
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    };

    return (
        <div className=" w-10 h-10 absolute bottom-7 right-7 outline-none">
            <div
                className="rounded-full bg-yellow-50 w-full h-full cursor-pointer relative outline-none flex justify-center items-center"
                onClick={modalOpen}
            >
                {showChatModal ? (
                    <RxCross2 className=" text-xl" />
                ) : (
                    <RxPlus className=" text-xl" />
                )}
                {showChatModal &&
                    (loading ? (
                        <LoadingSpinner height={false} />
                    ) : (
                        <div
                            className="absolute -top-2 translate-y-[-100%] right-0 bg-richblack-400 rounded-lg cursor-default outline-none"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-black text-center text-xl font-bold font-[cursive] bg-yellow-100 rounded-t-lg py-1">
                                <p>EduNxt Helper</p>
                                <button
                                    onClick={handleDownload}
                                    className=" font-[poppins] text-base border-2 border-yellow-100 rounded-md p-1 bg-yellow-100 hover:bg-yellow-200 hover:text-black transition-all duration-300 ease-in-out text-blue-200 underline"
                                >
                                    Download brief lecture notes
                                </button>
                            </div>
                            <div className=" w-[350px] h-[445px] rounded-lg bg-richblack-100">
                                <div className=" h-[400px] w-[352px] bg-richblack-700 rounded-t-lg overflow-y-scroll text-sm p-2 ">
                                    {conversations.length > 0 &&
                                        conversations.map(
                                            (conversation, index) => (
                                                <ChatModalQuesAns
                                                    response={conversation}
                                                    key={index}
                                                />
                                            )
                                        )}
                                </div>
                                <div className="flex gap-4 p-[5px]">
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
                                        value={query}
                                        className=" bg-white w-[80%] h-[35px] rounded-md outline-none p-1 overflow-y-auto text-sm text-richblack-900"
                                        onKeyDown={handleEnter}
                                    />
                                    <button
                                        className=" w-8 h-8 rounded-full bg-richblack-900 flex justify-center items-center"
                                        onClick={handleSubmit}
                                    >
                                        <FaArrowRight />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ChatModal;
