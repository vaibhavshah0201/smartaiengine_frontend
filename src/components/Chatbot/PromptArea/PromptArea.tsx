"use client";
import { projectService } from "@/services/project.service";
import Link from "next/link";
import { useEffect, useState } from "react";

const PromptArea = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");

  const [messages, setMessages] = useState([
    { text: "Hello, how can I help you?", isUser: false },
    // { text: "I need some information on your services.", isUser: true },
    // { text: "Sure, what specifically are you looking for?", isUser: false },
    // { text: "Can you tell me about your pricing?", isUser: true },
  ]);

  const addMessage = (newMessage: any) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserInput("");
  };

  const handleUserMessage = () => {
    const userMessage = {
      text: userInput,
      isUser: true,
    };
    addMessage(userMessage);

    const botReply = {
      text: "Sure, what specifically are you looking for?",
      isUser: false,
    };
    addMessage(botReply);
    setUserInput("");
  };

  const checkLastMessageIsUser = () => {
    if (messages.length === 0) return null; // Handle empty messages array case
    const lastMessage = messages[messages.length - 1];
    console.log(lastMessage.isUser);

    return lastMessage.isUser;
  };

  useEffect(() => {
    if (currentIndex < messages[messages.length - 1].text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(
          (prev) => prev + messages[messages.length - 1].text[currentIndex]
        );
        setCurrentIndex((prev) => prev + 1);
      }, 20);
      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, messages, 20]);

  console.log(messages[messages.length - 1].text[currentIndex]);

  return (
    <div className="relative min-h-screen rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 pt-5 mt-5 flex flex-col">
      <div className="flex-grow">
        <div className="flex flex-col space-y-4 p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.isUser
                    ? "bg-blue-500 text-white dark:text-white"
                    : "bg-gray-300 text-black dark:text-white"
                }`}
              >
                {checkLastMessageIsUser() ? displayedText : message.text}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="sticky bottom-0 pb-5">
        <input
          type="text"
          onChange={(e: any) => setUserInput(e.target.value)}
          onKeyDown={(e: any) => {
            if (e.code === "Enter") {
              handleUserMessage();
              setUserInput("");
            }
          }}
          placeholder="Message ChatBot"
          className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
        />
      </div>
    </div>
  );
};

export default PromptArea;
