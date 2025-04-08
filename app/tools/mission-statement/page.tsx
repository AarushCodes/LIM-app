"use client";
import { MissionStatement } from "@/components/mission-statement";

export default function MissionStatementPage() {
  return (
    <div className="flex min-h-screen flex-col p-4 bg-gradient-to-b from-green-50 to-lime-50">
      <div className="max-w-3xl w-full mx-auto py-12">
        <h1 className="text-3xl font-bold text-center mb-8 text-green-700">
          Mission Statement
        </h1>
        <MissionStatement ageGroup="adults" />
      </div>
    </div>
  );
}
