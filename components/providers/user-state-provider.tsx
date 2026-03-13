"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type SubscriptionTier = "FREE" | "PRO";

interface UserStateContextType {
    subscription: SubscriptionTier;
    setSubscription: (tier: SubscriptionTier) => void;
    toggleSubscription: () => void;
}

const UserStateContext = createContext<UserStateContextType | undefined>(undefined);

export function UserStateProvider({ children }: { children: React.ReactNode }) {
    const [subscription, setSubscriptionState] = useState<SubscriptionTier>("FREE");

    // Load from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem("mock_subscription");
        if (stored === "FREE" || stored === "PRO") {
            setSubscriptionState(stored);
        }
    }, []);

    const setSubscription = (tier: SubscriptionTier) => {
        setSubscriptionState(tier);
        localStorage.setItem("mock_subscription", tier);
    };

    const toggleSubscription = () => {
        const newTier = subscription === "FREE" ? "PRO" : "FREE";
        setSubscription(newTier);
    };

    return (
        <UserStateContext.Provider value={{ subscription, setSubscription, toggleSubscription }}>
            {children}
        </UserStateContext.Provider>
    );
}

export function useUserState() {
    const context = useContext(UserStateContext);
    if (context === undefined) {
        throw new Error("useUserState must be used within a UserStateProvider");
    }
    return context;
}
