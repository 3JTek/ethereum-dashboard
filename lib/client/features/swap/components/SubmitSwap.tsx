import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/lib/client/shared/components/shadcn-ui/alert-dialog";
import { Button } from "@/lib/client/shared/components/shadcn-ui/button";

const SubmitSwap = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="self-start">Swap</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Coming soon</AlertDialogTitle>
          <AlertDialogDescription>This functionality is being implemented and will be available soon.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Ok</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SubmitSwap;
