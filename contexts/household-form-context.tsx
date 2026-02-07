import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type HouseholdFormState = {
  householdId: string | null;
  name: string;
  memberEmails: string[];
};

type HouseholdFormContextType = {
  formState: HouseholdFormState;
  setHouseholdId: (id: string | null) => void;
  setName: (name: string) => void;
  setMemberEmails: (emails: string[]) => void;
  addMemberEmail: (email: string) => void;
  removeMemberEmail: (email: string) => void;
  resetForm: () => void;
};

const initialState: HouseholdFormState = {
  householdId: null,
  name: '',
  memberEmails: [],
};

const HouseholdFormContext = createContext<HouseholdFormContextType | undefined>(undefined);

export function useHouseholdForm() {
  const context = useContext(HouseholdFormContext);
  if (context === undefined) {
    throw new Error('useHouseholdForm must be used within HouseholdFormProvider');
  }
  return context;
}

export function HouseholdFormProvider({ children }: { children: React.ReactNode }) {
  const [formState, setFormState] = useState<HouseholdFormState>(initialState);

  const setHouseholdId = useCallback((householdId: string | null) => {
    setFormState((prev) => ({ ...prev, householdId }));
  }, []);

  const setName = useCallback((name: string) => {
    setFormState((prev) => ({ ...prev, name }));
  }, []);

  const setMemberEmails = useCallback((memberEmails: string[]) => {
    setFormState((prev) => ({ ...prev, memberEmails }));
  }, []);

  const addMemberEmail = useCallback((email: string) => {
    const normalized = email.trim().toLowerCase();
    setFormState((prev) => {
      if (prev.memberEmails.includes(normalized)) return prev;
      return { ...prev, memberEmails: [...prev.memberEmails, normalized] };
    });
  }, []);

  const removeMemberEmail = useCallback((email: string) => {
    setFormState((prev) => ({
      ...prev,
      memberEmails: prev.memberEmails.filter((e) => e !== email),
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormState(initialState);
  }, []);

  const value = useMemo(
    () => ({
      formState,
      setHouseholdId,
      setName,
      setMemberEmails,
      addMemberEmail,
      removeMemberEmail,
      resetForm,
    }),
    [
      formState,
      setHouseholdId,
      setName,
      setMemberEmails,
      addMemberEmail,
      removeMemberEmail,
      resetForm,
    ]
  );

  return (
    <HouseholdFormContext.Provider value={value}>
      {children}
    </HouseholdFormContext.Provider>
  );
}
