export interface TemplateInfo {
  global: {
    width: number;
    height: number;
  },
  background: {
    color: string;
  },
  layers: Layer[];
}

export interface Layer {
  id: string;
  type: LayerType;
  width: number;
  height: number;
  position: {
    x: number;
    y: number;
  };
  rotate: number;
  reverse?: {
    x: number;
    y: number;
  },
  source: {
    imageUrl?: string;
    content?: string;
  };
  opacity: number;
  style?: FontStyle;
  clip?: ImageClip;
  rectInfo?: RectShape;
  circleInfo?: RectShape;
  zIndex: number;
  isSelected?: boolean;
  isHover?: boolean;
  isEditing?: boolean;
  isLocked?: boolean;
  scale?: number;
}

export interface RectShape {
  fill: string;
  borderWidth: number;
  borderColor: string;
  borderStyle: string;
}

export interface FontStyle {
  font: string;
  fontSize: number;
  lineHeight: number;
  color: string;
  textAlign: Align;
  fontWeight: number;
  underline: boolean;
}

export interface ImageClip {
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
  pre: {
    width: number;
    height: number;
    top: number;
    left: number;
    right: number;
    bottom: number;
  }
}

export type LayerType = 'image' | 'text' | 'rect' | 'circle'
export type Align = 'left' | 'center' | 'right' | 'justify'

export enum LAYER_TYPE {
  EMPTY = 'empty',
  IMAGE = 'image',
  TEXT = 'text',
  RECT = 'rect',
  CIRCLE = 'circle',
  BACKGROUND = 'background'
}

export enum POINT_TYPE {
  TL = 'topLeft',
  TR = 'topRight',
  BL = 'bottomLeft',
  BR = 'bottomRight',
  T = 'top',
  B = 'bottom',
  L = 'left',
  R = 'right'
}

export interface Coords {
  x: number;
  y: number;
}
