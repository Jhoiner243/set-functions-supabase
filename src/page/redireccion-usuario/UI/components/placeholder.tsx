/* eslint-disable react/react-in-jsx-scope */
"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placholers-busqueda";
import { useState } from "react";
import { ResponseData, useRedirectContext } from "../../context/redireccion-context";

export function PlaceholdersAndVanishInputDemo() {
  const [input, setInput] = useState<ResponseData[]>([])
  
  const {onSubmit} = useRedirectContext()
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    console.log(e.target.value)
    }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input)
    onSubmit(input)
    console.log("submitted");
  };
  return (
    <div className="h-[30rem] flex flex-col justify-center  items-center px-4">
      <h2 className="mb-8 font-bold top-0 sm:mb-20 text-2xl text-center sm:text-5xl dark:text-white text-black">
        Busca nuestros mejores productos
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
