// import { Button } from "@/components/ui/button";

// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import RunlogList from "./RunLogList";
// import { useEffect, useState } from "react";
// import { getRunLogDetailAction } from "@/actions/runlog";

// type RunlogDetailSheetProps = {
//   data: any;
//   isSheetOpen: boolean;
//   setIsSheetOpen: (arg0: boolean) => void;
// };

// export function RunlogDetailSheet({ data, isSheetOpen, setIsSheetOpen }: RunlogDetailSheetProps) {
//   const [isOpen, setIsOpen] = useState(isSheetOpen);
//   const [runLogDetail, setRunLogDetail] = useState();

//   const fetchRunLogDetail = async () => {
//     const req = await getRunLogDetailAction(data?.botId);
//     console.log("DETAIL:", req);
//     setRunLogDetail(req);
//   };

//   console.log("DATA", data);

//   useEffect(() => {
//     fetchRunLogDetail();
//   }, [data]);

//   return (
//     <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//       {/* <SheetTrigger asChild>
//         <Button variant="outline">Open</Button>
//       </SheetTrigger> */}
//       <SheetContent className="sm:max-w-[625px]">
//         <SheetHeader>
//           <SheetTitle>Log details (GSH-0004)</SheetTitle>
//           <SheetDescription></SheetDescription>
//         </SheetHeader>
//         {/* <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//               Name
//             </Label>
//             <Input id="name" value="Pedro Duarte" className="col-span-3" />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="username" className="text-right">
//               Username
//             </Label>
//             <Input id="username" value="@peduarte" className="col-span-3" />
//           </div>
//         </div> */}
//         <RunlogList></RunlogList>
//         <SheetFooter>
//           {/* <SheetClose asChild>
//             <Button type="submit">Save changes</Button>
//           </SheetClose> */}
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   );
// }
