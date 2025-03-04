import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteBotAction } from "@/actions/bot";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Trash } from "lucide-react";

type DeleteBotButtonProps = {
  id: string;
};
export default function DeleteBotButton({ id }: DeleteBotButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    console.log("handleDelete", id);
    const del = await deleteBotAction(id);

    router.refresh();
    toast.success("The bot has been removed");
    // setIsLoading(false);
  };
  return (
    <Button variant="outline" size="icon" onClick={() => handleDelete(id)} disabled={isLoading}>
      {isLoading ? <Loader2 className="animate-spin" /> : <Trash className="h-4 w-4" />}
    </Button>
  );
}
