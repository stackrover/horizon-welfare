import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const CreateCategory = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="icon">
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle> Add New Category </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
