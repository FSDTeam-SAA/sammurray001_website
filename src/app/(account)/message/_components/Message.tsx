/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, Paperclip, Send } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { socket } from "@/lib/socket";

interface IUser {
  _id: string;
  email: string;
  profileImage?: string;
  fullName?: string; // ✅ FIX: optional added
  name?: string; // fallback
}

interface IConversation {
  _id: string;
  members: IUser[];
}

interface IMessage {
  _id: string;
  senderId: string | IUser;
  receiverId: string | IUser;
  conversationId: string;
  message?: string;
  fileUrl?: string; // ✅ File support added
}

function InboxPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id || "";
  const TOKEN = session?.user?.accessToken || "";

  const [selectedConversationId, setSelectedConversationId] =
    useState<string>("");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesRef = useRef<IMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [unreadCount, setUnreadCount] = useState<{ [key: string]: number }>({});

  // ------------------ Fetch Conversations ------------------
  const { data: convRes } = useQuery<IConversation[]>({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/conversation`,
        {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }
      );
      const json = await res.json();
      return json.data;
    },
    enabled: !!userId,
  });

  const conversations = convRes || [];
  const selectedConversation = conversations.find(
    (c) => c._id === selectedConversationId
  );

  // ------------------ Fetch Messages ------------------
  const fetchMessages = useCallback(async () => {
    if (!selectedConversationId) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/message/${selectedConversationId}`,
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      }
    );

    const json = await res.json();
    setMessages(json.data);
    messagesRef.current = json.data;

    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversationId, TOKEN]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // ------------------ SOCKET INITIAL JOIN ------------------
  useEffect(() => {
    if (!userId) return;

    socket.emit("join", userId);
  }, [userId]);

  // ------------------ SOCKET ROOM JOIN ------------------
  useEffect(() => {
    if (!selectedConversationId) return;

    socket.emit("join-chat", { conversationId: selectedConversationId });

    // ✅ FIX: return cleanup must be void (not returning socket)
    return () => {
      socket.emit("leave-chat", {});
    };
  }, [selectedConversationId]);

  // ------------------ RECEIVE MESSAGE ------------------
  useEffect(() => {
  const handleReceive = (msg: IMessage) => {
    if (msg.conversationId === selectedConversationId) {
      messagesRef.current = [...messagesRef.current, msg];
      setMessages([...messagesRef.current]);
    } else {
      setUnreadCount((prev) => ({
        ...prev,
        [msg.conversationId]: (prev[msg.conversationId] || 0) + 1,
      }));
    }
  };

  socket.on("receive-message", handleReceive);

  // ✅ Wrap in void arrow to satisfy TypeScript
  return () => { socket.off("receive-message", handleReceive); };
}, [selectedConversationId]);


  // ------------------ SEND TEXT MESSAGE ------------------
  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const receiver = selectedConversation.members.find((m) => m._id !== userId);
    if (!receiver) return;

    const payload: any = {
      senderId: userId,
      receiverId: receiver._id,
      conversationId: selectedConversation._id,
      message: messageInput,
    };

    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    socket.emit("send-message", payload);

    messagesRef.current = [
      ...messagesRef.current,
      { ...payload, _id: Date.now().toString() },
    ];

    setMessages([...messagesRef.current]);
    setMessageInput("");

    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ------------------ SEND FILE ------------------
  const handleSendFile = async (file: File) => {
    if (!selectedConversation) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("conversationId", selectedConversation._id);

    const receiver = selectedConversation.members.find((m) => m._id !== userId);
    if (!receiver) return;

    formData.append("senderId", userId);
    formData.append("receiverId", receiver._id);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/message/file`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${TOKEN}` },
        body: formData,
      }
    );

    const json = await res.json();
    const msg = json.data;

    socket.emit("send-message", msg);

    messagesRef.current = [...messagesRef.current, msg];
    setMessages([...messagesRef.current]);

    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex h-[80vh] container mx-auto py-9 px-10">
      {/* Sidebar */}
      <div className="w-80 bg-[#FFFFFF1A] border border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-white mb-4">Messages</h1>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search Message ..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((c) => {
            const otherUser = c.members.find((m) => m._id !== userId);

            return (
              <button
                key={c._id}
                onClick={() => {
                  setSelectedConversationId(c._id);
                  setUnreadCount((prev) => ({ ...prev, [c._id]: 0 }));
                }}
                className={`w-full px-4 py-3 flex items-start gap-3 border-b border-gray-100 hover:bg-gray-400 ${
                  selectedConversationId === c._id ? "bg-gray-400" : ""
                }`}
              >
                <Image
                  width={48}
                  height={48}
                  src={otherUser?.profileImage || "/noavatar.png"}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0 text-left">
                  <h3 className="font-medium text-white truncate">
                    {otherUser?.fullName || otherUser?.name || "Unknown User"}
                  </h3>
                  <h3 className="font-medium text-white text-xs truncate">
                    {otherUser?.email}
                  </h3>
                </div>

                {unreadCount[c._id] > 0 && (
                  <span className="bg-red-500 text-white rounded-full px-2 text-xs">
                    {unreadCount[c._id]}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-[#FFFFFF1A] flex flex-col">
        {selectedConversation && (
          <>
            <div className="p-6 border border-gray-200 bg-[#FFFFFF1A] flex items-center gap-3">
              <Image
                width={48}
                height={48}
                src={
                  selectedConversation.members.find((m) => m._id !== userId)
                    ?.profileImage || "/noavatar.png"
                }
                alt="User"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-base text-gray-900">
                  {selectedConversation.members.find((m) => m._id !== userId)
                    ?.fullName ||
                    selectedConversation.members.find((m) => m._id !== userId)
                      ?.name}
                </h2>
                <h2 className="font-semibold text-xs text-gray-900">
                  {
                    selectedConversation.members.find((m) => m._id !== userId)
                      ?.email
                  }
                </h2>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FFFFFF1A]">
              {messages.map((m) => {
                const sender =
                  typeof m.senderId === "string" ? m.senderId : m.senderId._id;
                const isSender = sender === userId;

                return (
                  <div
                    key={m._id}
                    className={`flex ${
                      isSender ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`${
                        isSender
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-900"
                      } rounded-lg px-4 py-2 max-w-xs`}
                    >
                      {m.message}

                      {m.fileUrl && (
                        <a
                          href={m.fileUrl}
                          target="_blank"
                          className="underline block mt-1 text-sm"
                        >
                          📎 File
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={scrollRef} />
            </div>

            <div className="p-6 border border-gray-200 bg-[#FFFFFF1A]">
              <div className="flex items-center gap-3">
                {/* FILE INPUT */}
                <label className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <Paperclip size={20} />
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleSendFile(e.target.files[0]);
                      }
                    }}
                  />
                </label>

                <input
                  type="text"
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none"
                />

                <button
                  onClick={handleSendMessage}
                  className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default InboxPage;
