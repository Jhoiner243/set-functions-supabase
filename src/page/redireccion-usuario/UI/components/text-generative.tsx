/* eslint-disable react/react-in-jsx-scope */
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { useRedirectContext } from "../../context/redireccion-context";
import { TextGenerateEffect } from "./text-generate-effect";

export function TextGenerateEffectDemo() {
  const { data } = useRedirectContext();

  if (data === null) return null;

  const MessageBubble = ({ content }: { content: string }) => (
    <div className="flex items-star space-x-3 max-w-3xl w-full">
      <Avatar className="h-8 w-8">
        <AvatarImage src="/ai-avatar.png" />
        <AvatarFallback className="bg-black">
          <Bot className="h-4 w-4 text-white" />
        </AvatarFallback>
      </Avatar>
      
      <Card className="flex items-center  px-4 py-5 top-0 bg-gray-100 rounded-lg shadow-none hover:bg-gray-50 transition-colors">
        {content.length > 300 ? (
          <p className="text-gray-800 leading-relaxed">{content}</p>
        ) : (
          <TextGenerateEffect 
            words={content} 
            className="text-gray-800 font-medium"
          />
        )}
      </Card>
    </div>
  );

  return (
    <div className="w-full px-4 md:px-6 py-4">
      {data ? (
        <MessageBubble content={data} />
      ) : (
        <div className="flex items-center space-x-2 text-gray-400">
          <Bot className="h-4 w-4" />
          <span>Esperando una pregunta...</span>
        </div>
      )}
    </div>
  );
}