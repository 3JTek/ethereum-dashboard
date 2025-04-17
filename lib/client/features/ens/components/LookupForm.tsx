"use client";

import { Label } from "@radix-ui/react-dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Search } from "lucide-react";
import React from "react";
import { isAddress } from "viem";

import { EnsName } from "@/lib/common/types/ensName";
import { Wallet } from "@/lib/common/types/wallet";

import backendApi from "../../../shared/api/backend-api";
import { EnsSearchType } from "../../../shared/api/backend-api/getEns";
import { Alert, AlertDescription, AlertTitle } from "../../../shared/components/shadcn-ui/alert";
import { Button } from "../../../shared/components/shadcn-ui/button";
import { Input } from "../../../shared/components/shadcn-ui/input";
import { Skeleton } from "../../../shared/components/shadcn-ui/skeleton";

const LookupForm = () => {
  const mutation = useMutation({
    mutationFn: async ({ searchInput, searchType }: { searchInput: Wallet | EnsName; searchType: EnsSearchType }) => {
      return backendApi.getEns(searchInput, searchType);
    },
  });

  const isEnsName = (name: string) => {
    const ensRegex = /^[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
    return ensRegex.test(name);
  };

  const validate = (values: { searchInput: string }) => {
    const errors: { searchInput?: string } = {};

    const { searchInput } = values;

    if (!isEnsName(searchInput) && !isAddress(searchInput)) {
      errors.searchInput = "Invalid ENS name or Ethereum address";
    }

    return errors;
  };

  const onSubmit = (values: { searchInput: string }) => {
    const { searchInput } = values;

    if (isEnsName(searchInput)) {
      return mutation.mutate({
        searchInput: searchInput as EnsName,
        searchType: EnsSearchType.LOOKUP,
      });
    }

    if (isAddress(searchInput)) {
      return mutation.mutate({
        searchInput: searchInput as Wallet,
        searchType: EnsSearchType.REVERSE,
      });
    }

    throw new Error("Input must be a valid Ethereum address or ENS name");
  };

  const formik = useFormik({
    initialValues: {
      searchInput: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate,
    onSubmit,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Address or ENS</Label>
          <div className="flex gap-2">
            <Input autoFocus placeholder="0x... or name.eth" type="text" {...formik.getFieldProps("searchInput")} />
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? <Skeleton className="h-4 w-4 rounded-full" /> : <Search className="h-4 w-4" />}
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>
      </form>

      {(formik.errors.searchInput || mutation.isError) && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{formik.errors.searchInput || "Could not process your request"}</AlertDescription>
        </Alert>
      )}

      {mutation.isPending && (
        <div className="space-y-2 mt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      )}

      {mutation.isSuccess && !mutation.isPending && (
        <div className="mt-4 space-y-4">
          {mutation.data && isAddress(mutation.data) && (
            <div className="space-y-1">
              <Label>Ethereum Address</Label>
              <div className="p-2 bg-muted rounded-md overflow-x-auto">
                <code data-testid="address-result" className="text-sm break-all">
                  {mutation.data}
                </code>
              </div>
            </div>
          )}

          {mutation.data && isEnsName(mutation.data) && (
            <div className="space-y-1">
              <Label>ENS Name</Label>
              <div className="p-2 bg-muted rounded-md">
                <code data-testid="ens-result" className="text-sm">
                  {mutation.data}
                </code>
              </div>
            </div>
          )}

          {!mutation.data && (
            <div data-testid="no-result" className="text-sm text-muted-foreground">
              No ENS or Address that matches your search could be found.
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LookupForm;
