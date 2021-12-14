import { MouseEvent as MouseEventType } from "react";

export class MouseEvents {
  constructor (e: MouseEventType<HTMLElement>, handleMove: (payload: any) => void, handleUp?: () => void) {
    this.mouseDown(e)
    this.handleMove = handleMove
    handleUp && (this.handleUp = handleUp)
  }
  
  private handleMove = (payload: any) => {}
  private handleUp = () => {}

  private startCoords = {
    x: 0,
    y: 0
  }

  private preCoords = {
    x: 0,
    y: 0
  }

  private mouseUp = () => {
    document.onmousemove = null
    document.onmouseup = null
    this.handleUp()
  }

  private mouseMove = (event: any) => {
    const diffX = event.clientX - this.preCoords.x
    const diffY = event.clientY - this.preCoords.y
    this.preCoords = {
      x: event.clientX,
      y: event.clientY
    }
    this.handleMove({
      diff: {
        x: diffX,
        y: diffY
      },
      startCoords: this.startCoords,
      curCoords: this.preCoords
    })
  }

  private mouseDown = (e: MouseEventType<HTMLElement>) => {
    this.startCoords = {
      x: e.clientX,
      y: e.clientY
    }
    this.preCoords = {
      x: e.clientX,
      y: e.clientY
    }
    document.onmousemove = this.mouseMove
    document.onmouseup = this.mouseUp
  }
}