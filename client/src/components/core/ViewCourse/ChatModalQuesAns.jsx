import { toast } from "react-hot-toast";
import { FaCopy } from "react-icons/fa";

const ChatModalQuesAns = ({ response }) => {
    const question = response.role === "user" ? response.content : null;
    const answer = response.role === "assistant" ? response.content : null;
    const copyToclipboard = async () => {
        try {
            await navigator.clipboard.writeText(answer);
            toast.success("Answer copied to clipboard");
        } catch (error) {
            toast.error("Failed to copy answer to clipboard");
        }
    };
    // Function to convert '\n' to <br> tags
    const convertNewlinesToBr = (text) => {
        return { __html: text.replace(/\n/g, "<br>") };
    };
    return (
        <div className="mx-2 max-w-3xl flex flex-col items-start">
            {question && (
                <div class="ml-auto rounded-lg rounded-tr-none my-1 p-2 text-sm bg-caribbeangreen-400 flex flex-col relative speech-bubble-right max-w-[70%]">
                    <p>{question}</p>
                </div>

                // <div className="mt-4 flex mb-10 w-full">
                //     <div className="flex text-white gap-7 w-full">
                //         {/* <img className="w-8 h-8" src="./user.jpg" alt="user" /> */}
                //         <p className="overflow-hidden text-ellipsis max-w-full">
                //             {question}
                //         </p>
                //     </div>
                // </div>
            )}
            {answer && (
                <div
                    class="mr-auto rounded-lg rounded-tl-none my-1 p-2 text-sm bg-white flex relative  speech-bubble-left text-richblack-900 max-w-[70%] items-center gap-2"
                    onClick={copyToclipboard}
                >
                    <p
                        dangerouslySetInnerHTML={convertNewlinesToBr(answer)}
                    ></p>
                    <FaCopy className="text-[10px] self-baseline cursor-pointer min-w-[10px]" />
                </div>

                // <div className="flex w-full">
                //     <div className="flex text-white gap-7 w-full">
                //         {/* <img
                //             className="w-8 h-8"
                //             src="./chatgpt-icon.png"
                //             alt="chatgpt"
                //         /> */}
                //         <p className="overflow-hidden text-ellipsis max-w-full">
                //             {answer}
                //         </p>
                //     </div>
                // </div>
            )}
        </div>
    );
};

export default ChatModalQuesAns;
