import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

interface State {
  accountType: boolean;
}

type Action = { type: "TOGGLE_ACCOUNT_TYPE" };

// Initial state
const initialState: State = {
  accountType:
    JSON.parse(localStorage.getItem("accountType") ?? "false") || false,
};

// Reducer function
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "TOGGLE_ACCOUNT_TYPE":
      return { ...state, accountType: !state.accountType };
    default:
      return state;
  }
}

// Create context

interface AccountContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}
const AccountContext = createContext<AccountContextProps | undefined>(
  undefined
);

interface AccountProviderProps {
  children: ReactNode;
}

// Provider component
export const AccountProvider = ({ children }: AccountProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Persist state in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("accountType", JSON.stringify(state.accountType));
  }, [state.accountType]);

  return (
    <AccountContext.Provider value={{ state, dispatch }}>
      {children}
    </AccountContext.Provider>
  );
};

// Custom hook to use account context
export const useAccount = () => useContext(AccountContext);
