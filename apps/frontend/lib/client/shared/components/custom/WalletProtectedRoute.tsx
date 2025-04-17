"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@design-system/alert-dialog";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { useAccount } from "wagmi";

import { Skeleton } from "../shadcn-ui/skeleton";

const WalletProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isConnected, isConnecting } = useAccount();
  const router = useRouter();

  const handleGoToDashboardClick = () => {
    router.push("/");
  };

  if (isConnecting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div data-testid="skeleton-list-item" className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Wallet not connected</AlertDialogTitle>
            <AlertDialogDescription>To use this functionality, you need to connect your wallet.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleGoToDashboardClick}>Go to dashboard</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return <>{children}</>;
};

export default WalletProtectedRoute;
