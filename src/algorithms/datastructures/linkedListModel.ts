export interface LLNode {
  id: string
  value: number
}

let nextLLId = 1
export function createLLNode(value: number): LLNode {
  return {
    id: `ll-${nextLLId++}-${Date.now()}`,
    value,
  }
}

export function insertAtHead(list: LLNode[], value: number): LLNode[] {
  return [createLLNode(value), ...list]
}

export function insertAtTail(list: LLNode[], value: number): LLNode[] {
  return [...list, createLLNode(value)]
}

export function insertAtIndex(
  list: LLNode[],
  index: number,
  value: number
): { success: boolean; list: LLNode[]; error?: string } {
  if (index < 0 || index > list.length) {
    return {
      success: false,
      list,
      error: `Index ${index} is out of bounds (0..${list.length}).`,
    }
  }
  const copy = [...list]
  copy.splice(index, 0, createLLNode(value))
  return { success: true, list: copy }
}

export function deleteByValue(
  list: LLNode[],
  value: number
): { success: boolean; list: LLNode[]; deletedIndex?: number; error?: string } {
  const index = list.findIndex((n) => n.value === value)
  if (index === -1) {
    return { success: false, list, error: `Value ${value} not found in the list.` }
  }
  const copy = [...list]
  copy.splice(index, 1)
  return { success: true, list: copy, deletedIndex: index }
}

export function deleteAtIndex(
  list: LLNode[],
  index: number
): { success: boolean; list: LLNode[]; deletedValue?: number; error?: string } {
  if (index < 0 || index >= list.length) {
    return {
      success: false,
      list,
      error: `Index ${index} is out of bounds (0..${list.length - 1}).`,
    }
  }
  const copy = [...list]
  const [removed] = copy.splice(index, 1)
  return { success: true, list: copy, deletedValue: removed.value }
}

export function searchLinkedList(
  list: LLNode[],
  target: number
): { pathNodeIds: string[]; foundIndex: number | null } {
  const pathNodeIds: string[] = []
  for (let i = 0; i < list.length; i++) {
    pathNodeIds.push(list[i].id)
    if (list[i].value === target) {
      return { pathNodeIds, foundIndex: i }
    }
  }
  return { pathNodeIds, foundIndex: null }
}
