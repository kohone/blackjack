import { Listener } from '../../Observer/Listener'
import { Event } from '../../Observer/Event'

export class ChangeTableEvent implements Event {

  private listeners: Listener[] = []

  attach (observer: Listener): void {
    const isExist = this.listeners.includes(observer)
    if (!isExist) {
      this.listeners.push(observer)
    }
  }

  detach (observer: Listener): void {
    const observerIndex = this.listeners.indexOf(observer)
    if (observerIndex !== -1) {
      this.listeners.splice(observerIndex, 1)
    }
  }

  dispatch (): void {
    for (const listener of this.listeners) {
      listener.handle()
    }
  }
}