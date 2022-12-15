import { Card } from '../../CardSet/Card'

export interface IPlayer {
  win_points: number

  points: number

  cards: Card[]

  addCard(): void
}