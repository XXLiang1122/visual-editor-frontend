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
  source: {
    imageUrl?: string;
    content?: string;
  };
  style?: FontStyle;
  zIndex: number;
  isEditing?: boolean;
}

export interface FontStyle {
  font: string;
  fontSize: number;
  lineHeight: number;
  color: string;
  textAlign: Align;
}

export type LayerType = 'image' | 'text'
export type Align = 'left' | 'center' | 'right' | 'justify'