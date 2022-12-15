import { Listener } from './Listener'

export interface Event {
  // Присоединяет слушателя к событию
  attach (observer: Listener): void;

  // Отсоединяет слушателя от события.
  detach (observer: Listener): void;

  // Уведомляет всех слушателей о событии.
  dispatch (): void;
}

