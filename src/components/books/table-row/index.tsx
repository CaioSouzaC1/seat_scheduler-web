import { acceptBook } from "@/app/api/books/accept-table";
import { rejectBook } from "@/app/api/books/reject-table";
import { queryClient } from "@/app/lib/react-query";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { IBook } from "@/interfaces/Books";
import { formatDate } from "@/lib/utils";
import { Popover } from "@radix-ui/react-popover";
import { useMutation } from "@tanstack/react-query";
import { RockingChair, } from "lucide-react";
import { toast } from "sonner";

export default function BookTableRow(book: IBook) {
  const { mutateAsync: acceptBookFn } = useMutation({
    mutationFn: acceptBook,
    mutationKey: ['accept-book'],
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["get-books"],
        refetchType: "all",
      })
      toast.success("Aceito com sucesso!")
    },
    onError() {
      toast.error("Error ao aceitar a reserva")
    }
  })

  const { mutateAsync: rejectBookFn } = useMutation({
    mutationFn: rejectBook,
    mutationKey: ['reject-book'],
    async onSuccess() {
      toast.success("Rejeitado com sucesso!")
      await queryClient.invalidateQueries({
        queryKey: ["get-books"],
        refetchType: "all",
      })
    },
    onError() {
      toast.error("Error ao rejetar a reserva")
    }
  })

  async function handleAccept(id: string) {
    acceptBookFn(id)
  }

  async function handleReject(id: string) {
    rejectBookFn(id)
  }

  return (
    <TableRow>
      <TableCell className="font-bold">
        <div className="flex gap-2 items-center">
          <span>{book.table.number}</span> <RockingChair size={16} />
        </div>
      </TableCell>
      <TableCell>
        {formatDate(book.reservedDate)}
      </TableCell>
      <TableCell>{book.status}</TableCell>
      <TableCell>{book.observation}</TableCell>
      <TableCell className="w-36">
        <Popover>
          <div className="flex gap-2">
            <Button variant={"default"} size={"sm"} className="flex gap-2" onClick={() => handleAccept(book.id)}>
              <span>Aceitar</span>
            </Button>
            <Button variant={"secondary"} size={"sm"} className="flex gap-2" onClick={() => handleReject(book.id)}>
              <span>Recusar</span>
            </Button>
          </div>
        </Popover>
      </TableCell>
    </TableRow >
  )
}
