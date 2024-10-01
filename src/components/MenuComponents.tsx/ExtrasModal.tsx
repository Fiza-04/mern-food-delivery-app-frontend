import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Extras = {
  name: string;
  price: number;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: Extras[];
};

const ExtrasModal = ({ isOpen, onClose, data }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        style={{ maxWidth: "400px", width: "100vw", height: "60vh" }}
      >
        <DialogTitle className="whitespace-nowrap text-2xl font-medium tracking-wide">
          Extras
        </DialogTitle>
        <div className="overflow-y-auto scrollbar-hide space-y-3">
          <DialogDescription>
            View Extra items added to your dish.
            <br />
            Do you want to Edit this List? Click on the Edit button in the table
            to Add or Edit your data.
          </DialogDescription>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.length > 0 ? (
                data.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>£{item.price.toFixed(2)}</TableCell>{" "}
                    {/* Format price */}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    No extras available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DialogClose onClick={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ExtrasModal;
