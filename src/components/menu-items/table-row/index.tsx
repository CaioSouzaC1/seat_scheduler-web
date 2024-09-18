import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { IMenuItem } from "@/interfaces/MenuItem";

interface MenuItemsTableRowProps {
  menuItem: IMenuItem;
  form: UseFormReturn<{ menuItems: string[] }>;
}

export default function MenuItemsTableRow({
  menuItem,
  form,
}: MenuItemsTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <FormField
          control={form.control}
          name="menuItems"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox
                  checked={field.value.includes(menuItem.id)}
                  onCheckedChange={(e) => {
                    const newValue = e
                      ? [...field.value, menuItem.id]
                      : field.value.filter((id: string) => id !== menuItem.id);
                    field.onChange(newValue);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        <div className="flex gap-2 items-center">
          <DollarSign size={16} />
          <span>{menuItem.price}</span>
        </div>
      </TableCell>
      <TableCell className="font-bold">{menuItem.name}</TableCell>
      <TableCell>{menuItem.description}</TableCell>
    </TableRow>
  );
}
