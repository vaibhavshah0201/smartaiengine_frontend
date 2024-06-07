"use client";
import { chatPromptService } from "@/services/chatPrompt.service";
import { useEffect, useState } from "react";
import BouncingDots from "./BouncingDot";

BouncingDots
const PromptArea = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState<any>("");
  const [isTyping, setIsTyping] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false); // New state for waiting

  console.log(waitingForResponse);
  
  const [messages, setMessages] = useState([
    { text: "Hello, how can I help you?", isUser: false },
  ]);

  const addMessage = (newMessage:any) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserInput("");
  };

  const handleUserMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = {
      text: userInput,
      isUser: true,
    };
    addMessage(userMessage);
    setWaitingForResponse(true); // Set waiting state to true

    try {
      const result = await chatPromptService.askPrompt(userInput);
      const data = JSON.parse(result.data);

      const botReply = {
        text: data.answer,
        isUser: false,
      };
      if (result.data) {
        setIsTyping(true); // Set typing state to true before adding bot's message
        setWaitingForResponse(false); // Set waiting state to false
        addMessage(botReply);
      }
    } catch (error) {
      console.error(error);
      const botReply = {
        text: "Sorry, something went wrong.",
        isUser: false,
      };
      setWaitingForResponse(false); // Set waiting state to false
      addMessage(botReply);
    }
  };

  useEffect(() => {
    if (isTyping) {
      if (currentIndex < messages[messages.length - 1].text.length) {
        const timeoutId = setTimeout(() => {
          setDisplayedText(
            (prev) => prev + messages[messages.length - 1].text[currentIndex]
          );
          setCurrentIndex((prev) => prev + 1);
        }, 20);
        return () => clearTimeout(timeoutId);
      } else {
        setIsTyping(false); // Typing is done
        setDisplayedText(""); // Reset displayed text for next message
        setCurrentIndex(0); // Reset index for next message
      }
    }
  }, [currentIndex, messages, isTyping]);

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
                {index === messages.length - 1 && !message.isUser && isTyping
                  ? displayedText
                  : message.text}
              </span>
            </div>
          ))}
          {waitingForResponse && (
            <div className="flex justify-start">
              <BouncingDots />
            </div>
          )}
        </div>
      </div>
      <div className="sticky bottom-0 pb-5">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              handleUserMessage();
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
