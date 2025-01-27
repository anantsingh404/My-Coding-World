import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { adminEndpoints } from "../apis";

const { GET_LOGS } = adminEndpoints;

export const getLogs = async (token) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET", GET_LOGS, null, {
            Authorization: `Bearer ${token}`,
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        // toast.success("Logs retreived successfully");
        result = response.data.data;
    } catch (error) {
        toast.error("Could Not retreive logs");
        result = [];
    }
    toast.dismiss(toastId);
    return result;
};
