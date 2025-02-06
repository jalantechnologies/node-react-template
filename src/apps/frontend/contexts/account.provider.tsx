import useAsync from 'frontend/contexts/async.hook';
import { AccountService } from 'frontend/services';
import { Account, ApiResponse, AsyncError } from 'frontend/types';
import { Nullable } from 'frontend/types/common-types';
import React, { createContext, PropsWithChildren, useContext } from 'react';

type AccountContextType = {
  accountDetails: Account;
  accountError: Nullable<AsyncError>;
  deleteAccount: () => Promise<Nullable<void>>;
  deleteAccountError: Nullable<AsyncError>;
  getAccountDetails: () => Promise<Nullable<Account>>;
  isAccountLoading: boolean;
  isDeleteAccountLoading: boolean;
};

const AccountContext = createContext<Nullable<AccountContextType>>(null);

const accountService = new AccountService();

export const useAccountContext = (): AccountContextType =>
  useContext(AccountContext) as AccountContextType;

const getAccountDetailsFn = async (): Promise<ApiResponse<Account>> =>
  accountService.getAccountDetails();

const deleteAccountFn = async (): Promise<ApiResponse<void>> =>
  accountService.deleteAccount();

interface AccountProviderProps {
  children: ReactNode;
}

export const AccountProvider: React.FC<
  PropsWithChildren<AccountProviderProps>
> = ({ children }) => {
  const {
    isLoading: isAccountLoading,
    error: accountError,
    result: accountDetails,
    asyncCallback: getAccountDetails,
  } = useAsync(getAccountDetailsFn);

  const {
    isLoading: isDeleteAccountLoading,
    error: deleteAccountError,
    asyncCallback: deleteAccount,
  } = useAsync(deleteAccountFn);

  return (
    <AccountContext.Provider
      value={{
        accountDetails: new Account({ ...accountDetails }), // creating an instance to access its methods
        accountError,
        deleteAccount,
        deleteAccountError,
        getAccountDetails,
        isAccountLoading,
        isDeleteAccountLoading,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
