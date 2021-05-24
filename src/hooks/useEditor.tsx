import React, { useEffect, useRef, useState } from "react";
import { defaultActiveState, readKey } from "../utils";

export function useEditor(autoFocus: boolean) {
  const editorRef = useRef<HTMLInputElement>(null);

  const [active, setActive] = useState(defaultActiveState);
  const [range, setRange] = useState<Range | undefined | null>(null);

  useEffect(() => {
    if (autoFocus) editorRef.current?.focus();

    readKey(setRange, active, setActive);
  }, [autoFocus, active, editorRef, setActive, setRange]);

  return { editorRef, range, active, setActive };
}
