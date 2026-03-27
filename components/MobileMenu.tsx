import { X } from "lucide-react";
import React from "react";

interface MenuProps {
  isActive: boolean;
}

const MobileMenu = ({ isActive }: MenuProps) => {
  return (
    <div className="absolute inset-0 bg-[black] flex justify-end">
      <div className="w-[85%] h-full bg-[white] px-4 py-8">
        <div className="flex justify-end">
          <X className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
