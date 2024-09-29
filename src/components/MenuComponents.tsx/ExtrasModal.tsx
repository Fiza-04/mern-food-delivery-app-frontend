import { Dialog, DialogContent, DialogTitle, DialogClose } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: { name: string; price: string }[];
};

const ExtrasModal = ({ isOpen, onClose, data }: Props) => {
  console.log("data in ExtrasModal => ", data);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        style={{ maxWidth: "400px", width: "100vw", height: "60vh" }}
      >
        <DialogTitle className="whitespace-nowrap text-2xl font-medium tracking-wide">
          Extras
        </DialogTitle>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((item) => (
                <TableRow>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <DialogClose onClick={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ExtrasModal;
