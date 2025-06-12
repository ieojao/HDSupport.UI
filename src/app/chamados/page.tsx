"use client";

import Header from "@/components/layout/header";
import { useState } from "react";
import ConversasList from "@/components/chamados/ConversasList";
import ChatArea from "@/components/chamados/ChatArea";

export default function Page() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar fixa */}
      <Header />
      {/* Bloco único: conversas + chat */}
      <div className="flex flex-1 bg-neutral-950">
        <div className="w-96 max-w-sm border-r border-neutral-800 bg-neutral-900 flex flex-col">
          <ConversasList onSelect={setSelectedChat} selectedChat={selectedChat} />
        </div>
        <div className="flex-1 flex flex-col">
          <ChatArea chat={selectedChat} />
        </div>
      </div>
    </div>
  );
}