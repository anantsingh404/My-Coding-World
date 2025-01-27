import LoadingSpinner from "../../common/LoadingSpinner";
import { RxCross2, RxPlus } from "react-icons/rx";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import ChatModalQuesAns from "./ChatModalQuesAns";
import { openAIEndpoints } from "../../../services/apis";
import { apiConnector } from "../../../services/apiconnector";
function Chatgptmodal({ showChatGPTModal, setShowChatGPTModal }) {
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [conversations, setConversations] = useState([]);
    const [initialContent, setInitialContent] = useState("");
    const handleSubmit = async () => {
        if (loading === true) return;
        // API call for GPT
        const updatedConversations = [
            ...conversations,
            { role: "user", content: query },
        ];
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
        setQuery("");
    };
    const modalOpen = async () => {
        console.log("modal open");
        setShowChatGPTModal(!showChatGPTModal);
        console.log(showChatGPTModal);
    };
    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div>
            <div className="  h-10 absolute bottom-7 right-40 outline-none">
                <div
                    className="rounded-lg p-3 text-richblack-900 bg-yellow-50 w-full h-full cursor-pointer relative outline-none flex justify-center items-center"
                    onClick={modalOpen}
                >
                    {showChatGPTModal ? (
                        <RxCross2 className=" text-xl" />
                    ) : (
                        <p>Student Assistant </p>
                    )}
                    {showChatGPTModal &&
                        (loading ? (
                            <LoadingSpinner height={false} />
                        ) : (
                            <div
                                className="absolute -top-2 translate-y-[-100%] right-0 bg-richblack-400 rounded-lg cursor-default outline-none"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="text-black text-center text-xl font-bold font-[cursive] bg-yellow-100 rounded-t-lg py-1">
                                    <p>Student helper</p>
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
                                            <FaArrowRight className="text-white" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Chatgptmodal;