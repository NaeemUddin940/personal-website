"use client";
import Header from "./components/header";
import Stats from "./components/stats";
import Table from "./components/table";

export default function AllAttributes() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Header />

        <Stats />

        <Table />
      </div>
    </div>
  );
}
