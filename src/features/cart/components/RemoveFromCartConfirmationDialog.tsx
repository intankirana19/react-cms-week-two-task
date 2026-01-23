import { AlertTriangle } from "lucide-react";
import { Button } from "../../../shared/components/Button";
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../../shared/components/Dialog";

interface RemoveFromCartConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function RemoveFromCartConfirmationDialog({ open, onOpenChange, onConfirm }: Readonly<RemoveFromCartConfirmationDialogProps>) {
    // const handleConfirm = () => {
    //     onConfirm()
    // };

    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent size="md">
                <DialogHeader>
                    <DialogTitle>Hapus Produk Dari Keranjang</DialogTitle>
                </DialogHeader>

                <DialogBody>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-18 h-18 bg-danger-100 rounded-full flex items-center justify-center mb-4">
                            <AlertTriangle className="w-12 h-12 text-danger-600" />
                        </div>
                        <p className="font-semibold">Yakin mau menghapus produk ini dari keranjang?</p>
                    </div>
                </DialogBody>

                <DialogFooter>
                    <Button variant="tertiary" onClick={() => onOpenChange(false)}>
                        Kembali
                    </Button>
                    <Button variant="secondary" onClick={onConfirm}>
                        Hapus
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}