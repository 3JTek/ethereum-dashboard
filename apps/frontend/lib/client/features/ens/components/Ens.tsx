import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../shared/components/shadcn-ui/card";
import LookupForm from "./LookupForm";

const Ens = () => {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Ethereum Address Lookup</CardTitle>
          <CardDescription>Enter an Ethereum address or ENS name to get the corresponding information</CardDescription>
        </CardHeader>
        <CardContent>
          <LookupForm />
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <p>Powered by Alchemy</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Ens;
