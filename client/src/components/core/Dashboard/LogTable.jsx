// src/components/LogTable.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLogs } from "../../../services/operations/logsAPI";

const LogTable = () => {
    const { token } = useSelector((state) => state.auth);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            const result = await getLogs(token);
            console.log(result);
            setLogs(result);
        };

        fetchLogs();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-2xl font-bold text-richblack-5 mb-6">
                Logs from the Last 30 Days:
            </h2>
            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
                <table className="min-w-full divide-y divide-gray-200 bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-richblack-900 uppercase tracking-wider">
                                Timestamp
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-richblack-900 uppercase tracking-wider">
                                Correlation ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-richblack-900 uppercase tracking-wider">
                                User ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-richblack-900 uppercase tracking-wider">
                                Action
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-richblack-900 uppercase tracking-wider">
                                Route
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {logs.map((log, index) => (
                            <tr
                                key={index}
                                className={`${
                                    index % 2 === 0 ? "bg-richblack-50" : "bg-white"
                                } hover:bg-gray-100`}
                            >
                                <td className="px-6 py-4 text-sm font-semibold text-caribbeangreen-300">
                                    {log.timestamp}
                                </td>
                                <td className="px-6 py-4 text-sm text-blue-700">
                                    {log.correlationId}
                                </td>
                                <td className="px-6 py-4 text-sm text-blue-200">
                                    {log.userId}
                                </td>
                                <td className="px-6 py-4 text-sm text-pink-400">
                                    {log.action}
                                </td>
                                <td className="px-6 py-4 text-sm text-pink-900">
                                    {log.routeName}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LogTable;
