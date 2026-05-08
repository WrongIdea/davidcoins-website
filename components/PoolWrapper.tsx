"use client";
import dynamic from "next/dynamic";

const Pool = dynamic(() => import("@/components/Pool"), { ssr: false });

export default function PoolWrapper() {
  return <Pool />;
}
