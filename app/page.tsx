"use client";
import { useEffect, useState } from "react";
import {
  DynamicWidget,
  useTelegramLogin,
  useDynamicContext,
} from "../lib/dynamic";

import Spinner from "./Spinner";

export default function Main() {
  const { sdkHasLoaded, user } = useDynamicContext();
  const { telegramSignIn } = useTelegramLogin();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!sdkHasLoaded) return;

    const signIn = async () => {
      if (!user) {
        await telegramSignIn({ forceCreateUser: true });
      }
      setIsLoading(false);
    };

    signIn();
  }, [sdkHasLoaded]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-black" style={{backgroundColor: "#f9f9fb", backgroundImage: "url('/background-pattern.svg')", backgroundBlendMode: "overlay", backgroundRepeat: "repeat"}}>
      <div className="flex flex-col items-center justify-center text-center max-w-3xl px-4">
        <div className="pt-8">
          <div className="inline-flex items-center justify-center">
            <img src="/logo-full.svg" alt="logo" className="w-auto h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm mb-7 mt-7 text-sm">
          <h2 className="text-xl font-semibold mb-3">You got an auto-wallet!</h2>
          <div className="flex justify-center py-4">
            {isLoading ? <Spinner /> : <DynamicWidget />}
          </div>
          <p className="mb-3">
            Zero clicks, one multi-chain wallet. We automatically created an embedded wallet for you.
          </p>
        </div>
      </div>
    </div>
  );
}
