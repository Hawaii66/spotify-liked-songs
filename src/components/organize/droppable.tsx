import React from "react";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  id: string;
  children: ({ isOver }: { isOver: boolean }) => React.ReactNode;
};

export default function Droppable({ children, id }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="flex" ref={setNodeRef}>
      {children({ isOver })}
    </div>
  );
}
