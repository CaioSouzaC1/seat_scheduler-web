import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import NewTableForm from "../new-table-form";
import NewTablesInBulkForm from "../new-tables-in-bulk-form";

export default function NewTableDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"secondary"} className="flex gap-2">
          <span>Cadastrar</span> <PlusCircle size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar nova mesa</DialogTitle>
          <Tabs defaultValue="store-unique">
            <TabsList className="w-full">
              <TabsTrigger className="w-full" value="store-unique">
                Única
              </TabsTrigger>
              <TabsTrigger className="w-full" value="store-in-bulk">
                Em massa
              </TabsTrigger>
            </TabsList>
            <TabsContent value="store-unique">
              <NewTableForm />
            </TabsContent>
            <TabsContent value="store-in-bulk">
              <NewTablesInBulkForm />
            </TabsContent>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
