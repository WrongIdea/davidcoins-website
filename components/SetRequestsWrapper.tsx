"use client";
import dynamic from "next/dynamic";

const SetRequests = dynamic(() => import("@/components/SetRequests"), { ssr: false });

export default function SetRequestsWrapper() {
  return <SetRequests />;
}
