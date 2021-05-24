import React, { useEffect } from "react";
import { Element } from "../types";
import { removePopup } from "../utils";

export function usePopup(ref: any, element: Element, next?: () => void) {
  useEffect(() => {
    const node = document.getElementById(element);
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (node?.style.visibility === "visible") {
          removePopup(element);
          if (next) next();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, element, next]);
};
