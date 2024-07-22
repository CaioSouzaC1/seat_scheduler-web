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
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

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
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Logradrouro</TableCell>
              <TableCell>
                {address.street}, {address.number}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bairro</TableCell>
              <TableCell>{address.neighborhood}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cidade</TableCell>
              <TableCell>{address.city}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Estado</TableCell>
              <TableCell>{address.state}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>País</TableCell>
              <TableCell>{address.country}</TableCell>
            </TableRow>
            {address.complement && (
              <TableRow>
                <TableCell>Complemento</TableCell>
                <TableCell>{address.complement}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>Cep</TableCell>
              <TableCell>{address.cep}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
