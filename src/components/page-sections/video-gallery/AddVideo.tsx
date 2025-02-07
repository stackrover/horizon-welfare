import { IconPlus } from "@tabler/icons-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

export default function AddVideo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="flex items-center justify-center border border-dashed border-black/50 hover:bg-black/10">
          <IconPlus size={48} />
        </div>
      </DrawerTrigger>

      <DrawerContent className="inset-x-auto">
        <DrawerHeader>
          <DrawerTitle>Add Video</DrawerTitle>
          <DrawerDescription>Add a new video</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
