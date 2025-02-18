"use client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { createInegrationAction } from "@/actions/integrations";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import IntegrationForm from "./integration-form";
import { CardSkeleton } from "./CardSkeleton";

type IntegrationCardProps = {
  data: IntregationData[];
};

export function IntegrationCards({ data }: IntegrationCardProps) {
  const [loadings, setLoadings] = useState(false);

  const router = useRouter();

  const handleOnSubmit = async (event: any) => {
    console.log("handleOnSubmit", event);
    const createIntegrationData = {
      id: event.id,
      intregrationTypeId: event.integrationType,
      clientId: event.clientId,
      clientSecret: event.clientSecret,
      campaignPrefix: event.campaignPrefix,
    };
    setLoadings(true);
    const int = await createInegrationAction(createIntegrationData);

    console.log("int: ", int);

    router.refresh();
    setLoadings(false);
    toast.success("data.success");
  };

  const populateCards = (data: any) => {
    console.log("POPULATECARDS:", data);
    return (
      <>
        {data.map((item: any) => (
          <Card key={item.id} className="rounded-lg p-4 shadow-lg w-[350px]">
            <CardHeader className="border-b p-0">
              <div className="flex items-center gap-2 font-semibold py-2">
                <Avatar>
                  <AvatarImage src={item.logo} alt="@cald" />
                  <AvatarFallback>I</AvatarFallback>
                </Avatar>
                <h4 className="">{item.name}</h4>
              </div>
            </CardHeader>
            <CardContent className="py-4 border-b h-[40%]">
              <p className="text-sm">{item.description}</p>
            </CardContent>

            <CardFooter className="flex  flex-col justify-end items-start pt-4 pb-0">
              <p className="text-sm text-muted-foreground">Status: {item?.status}</p>
              <IntegrationForm
                className="mt-4 self-end"
                buttonLabel={item?.status === "CONFIGURED" ? "Manage" : "Configure"}
                data={item}
                onSubmit={handleOnSubmit}
              ></IntegrationForm>
            </CardFooter>
          </Card>
        ))}
      </>
    );
  };

  return <>{!loadings ? populateCards(data) : <CardSkeleton></CardSkeleton>}</>;
}
