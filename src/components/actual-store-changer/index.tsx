"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { StoreIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useStore } from "@/context/StoreContext/Index";
import { useGetStores } from "@/hooks/queries/stores/use-get-stores";
import { Skeleton } from "../ui/skeleton";
import { IStore } from "@/interfaces/Store";
import { useEffect } from "react";
export default function ActualStoreChanger() {
  const { stores } = useGetStores();

  const { store, setStore } = useStore();

  useEffect(() => {
    if (store === null && stores && stores?.data.meta.total > 0) {
      setStore(stores.data.data[0]);
    }
  }, [stores]);

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          disabled={stores && stores.data.meta.total === 0}
          className="min-w-36"
          size="sm"
          variant={"outline"}>
          <div className="flex gap-2 items-center">
            {!stores ? (
              <Skeleton className="w-16 h-4" />
            ) : stores?.data.meta.total === 0 ? (
              <span className="w-16 line-clamp-1">Nenhuma</span>
            ) : stores?.data.meta.total === 1 ? (
              <span className="w-16 line-clamp-1">
                {stores?.data.data[0].name}
              </span>
            ) : store ? (
              <span className="w-16 line-clamp-1">{store?.name}</span>
            ) : (
              <Skeleton className="w-16 h-4" />
            )}
            <StoreIcon size={20} />
          </div>
        </Button>
      </PopoverTrigger>
      {stores && stores?.data.meta.total > 1 && (
        <>
          <PopoverContent className="flex flex-col gap-3 max-w-36">
            {stores?.data.data.map((store: IStore) => (
              <Button
                onClick={() => setStore(store)}
                key={store.id}
                variant={"outline"}
                className="w-full line-clamp-1">
                {store.name}
              </Button>
            ))}
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}
