'use client';

import { DndContext, DragEndEvent } from '@dnd-kit/core';

export default function DragDropWrapper({
  children,
  onDragEnd,
}: {
  children: React.ReactNode;
  onDragEnd: (event: DragEndEvent) => void;
}) {
  return <DndContext onDragEnd={onDragEnd}>{children}</DndContext>;
}
