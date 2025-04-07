import React from "react";

export function checkNoForbiddenTags(children: React.ReactNode, forbiddenTags: string[], errMsg: string): void {
  const stack: React.ReactNode[] = [children];

  while (stack.length) {
    const node = stack.pop();

    if (!node) continue;

    if (Array.isArray(node)) {
      stack.push(...node);
    } else if (React.isValidElement(node)) {
      const type = node.type;

      if (typeof type === "string" && forbiddenTags.includes(type)) {
        throw new Error(errMsg);
      }

      // @ts-ignore
      stack.push(node.props.children);
    }
  }
}
