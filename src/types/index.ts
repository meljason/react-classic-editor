import React from 'react';

export type Style =
  | "bold"
  | "italic"
  | "heading"
  | "underline"
  | "link"
  | "image"
  | "ol"
  | "ul";

export type Element = "tooltip" | "link-insert" | "link-preview" | "image-modal" | "link-modal"

export interface EditorInterface {
  toolbar?: boolean;
  font?: 'sm' | 'md';
  placeholder?: string;
  autoFocus?: boolean;
  spellCheck?: boolean;
  showCount?: boolean;
  border?: boolean;
}

export interface ActiveParams {
  active: any;
  setActive: (param: any) => void;
}

export interface SetStyleParams {
  ac: ActiveParams;
  toolbar: boolean
}