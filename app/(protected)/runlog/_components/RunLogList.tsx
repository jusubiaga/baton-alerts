"use client";

import { getRunLogDetailAction } from "@/actions/runlog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";

const items = [
  {
    id: 1,
    name: "GSH-0003",
    status: "NOT_FOUND_ISSUES",
    statusText: "",
    text: "customers/9469690341/adGroupAdAssetViews/176242349954~728382173882~193438883636~HEADLINE",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "GSH-0003",
    status: "FOUND_ISSUES",
    statusText: "7 missing headline",
    text: "customers/9469690341/adGroupAdAssetViews/176242349954~728382173882~193438883636~HEADLINE",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Carlos López",
    status: "FOUND_ISSUES",
    statusText: "10 missing headline",
    text: "Pendiente de aprobación",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

const statusColors = {
  NO_FOUND_ISSUES: "bg-green-500",
  FOUND_ISSUES: "bg-red-500",
};

type RunlogListProps = {
  bot: any;
};

const SkeletonList = () => {
  return (
    <>
      {
        // Skeleton Loader usando Skeleton de Shadcn UI
        [...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center gap-4 p-2 border-b last:border-none">
            <Skeleton className="w-6 h-6 rounded-full" />
            <div className="flex-1 min-w-0">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-full" />
            </div>
            <Skeleton className="h-5 w-16 rounded" />
          </div>
        ))
      }
    </>
  );
};

export default function RunlogList({ bot }: RunlogListProps) {
  const [runLogDetail, setRunLogDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRunLogDetail = async (id: string) => {
    setIsLoading(true);
    const req = await getRunLogDetailAction(id);
    setIsLoading(false);
    setRunLogDetail(req);
  };

  useEffect(() => {
    fetchRunLogDetail(bot.id);
  }, [bot]);

  if (isLoading) {
    return <SkeletonList />;
  }

  return (
    <div className="space-y-4 p-4  w-full h-[95%] overflow-y-auto">
      {runLogDetail.map((item, index) => (
        <div key={index} className="flex items-center gap-4 p-2 border-b last:border-none">
          {/* <Avatar>
            <AvatarImage src={item.avatar} alt={item.name} />
            <AvatarFallback>{item.name[0]}</AvatarFallback>
          </Avatar> */}
          {item.status === "NO_FOUND_ISSUES" ? (
            <CheckCircle size={24} color="#22c55e" />
          ) : (
            <CircleAlert size={24} color="#ef4444" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">Resource Identifier</p>
            <p className="text-xs text-gray-500 break-words truncate">{item.resource_id}</p>
          </div>
          {item.status === "FOUND_ISSUES" ? (
            <Badge className={`${statusColors[item.status]} text-white`}>{Math.abs(item.diff)} missing headline</Badge>
          ) : null}
        </div>
      ))}
    </div>
  );
}
