import { IAddress } from "@/interfaces/Adresses";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function AddressTable(address: IAddress) {
  return (
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
  );
}
