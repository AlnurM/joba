"use client";

import type React from "react";
import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button, Input, ScrollArea } from "@/shared/ui";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export function ResumeChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your CV assistant. How can I help you improve your CV today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue, cvData);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.sender === "ai" ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="text-xs font-medium">
                    {message.sender === "user" ? "You" : "CV Assistant"}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Ask for help with your CV..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function generateAIResponse(userMessage: string): string {
  const userMessageLower = userMessage.toLowerCase();

  // Simple pattern matching for demo purposes
  if (
    userMessageLower.includes("summary") ||
    userMessageLower.includes("profile")
  ) {
    return "For your professional summary, try to keep it concise (3-5 sentences) while highlighting your key strengths and career achievements. Focus on what makes you unique as a candidate.";
  }

  if (
    userMessageLower.includes("experience") ||
    userMessageLower.includes("job")
  ) {
    return "When describing your work experience, use the STAR method: Situation, Task, Action, Result. Quantify your achievements whenever possible with numbers and percentages.";
  }

  if (userMessageLower.includes("skill")) {
    return "For your skills section, prioritize relevant technical skills for the job you're applying to. Consider organizing them by proficiency level or by category (e.g., programming languages, tools, soft skills).";
  }

  if (userMessageLower.includes("education")) {
    return "In your education section, include relevant coursework, academic achievements, and projects that demonstrate your knowledge in your field.";
  }

  if (userMessageLower.includes("project")) {
    return "When describing projects, focus on your specific contributions, the technologies used, and the impact or results of the project. Include links to live demos or repositories if available.";
  }

  if (
    userMessageLower.includes("help") ||
    userMessageLower.includes("improve")
  ) {
    return "I can help you improve specific sections of your CV. Just let me know which part you'd like to enhance, such as your summary, work experience, skills, or education.";
  }

  // Default response
  return "I'm here to help you improve your CV. You can ask me for advice on specific sections, formatting tips, or how to highlight your achievements effectively.";
}
