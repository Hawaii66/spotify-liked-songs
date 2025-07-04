import { useDraggable } from "@dnd-kit/core";
import clsx from "clsx";

type Props = {
  id: string;
  children: (opts: { isOver: boolean }) => React.ReactNode;
};

export default function Draggable({ children, id }: Props) {
  const { attributes, listeners, setNodeRef, transform, over } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button
      className={clsx(style && "z-50", "w-full")}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children({
        isOver: transform && over ? true : false,
      })}
    </button>
  );
}
