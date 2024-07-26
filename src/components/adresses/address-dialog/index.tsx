import { IAddress } from "@/interfaces/Adresses";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";
import AddressTable from "../address-table";

export default function AddressDialog(address: IAddress) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-8 h-8" size={"icon"}>
          <MapPin className="w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhamento do endereço</DialogTitle>
          <DialogDescription>
            <p>Atualizada em: {formatDate(address.updatedAt)}</p>
          </DialogDescription>
        </DialogHeader>
        <AddressTable {...address} />
      </DialogContent>
    </Dialog>
  );
}
