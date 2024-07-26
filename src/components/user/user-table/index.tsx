import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { IUser } from "@/interfaces/User";
import { formatDate } from "@/lib/utils";

export default function UserTable(user: IUser) {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell>{user.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Celular</TableCell>
          <TableCell>{user.phone}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell>{user.email}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Criação da conta</TableCell>
          <TableCell>{formatDate(user.createdAt)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
