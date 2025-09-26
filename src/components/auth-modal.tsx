import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";

interface AuthModalProps {
  isOpen: boolean;
  onOpen: (value: boolean) => void;
}

export function AuthModal({ isOpen, onOpen }: AuthModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogContent className="h-72 p-5 pt-14">
        <DialogTitle className="text-4xl font-semibold text-center">
          Ви не авторизовані!
        </DialogTitle>
        <div className="flex items-end justify-center gap-2.5">
          <NavLink to="/login">
            <Button>Log in</Button>
          </NavLink>
          <NavLink to="/registration">
            <Button>Registration</Button>
          </NavLink>
        </div>
      </DialogContent>
    </Dialog>
  );
}
