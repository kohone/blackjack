import { CardSet } from './CardSet/CardSet'
import { Table } from './Table/Table'

export class Game {
  async start () {
    // генерируем набор карт
    CardSet.getInstance()

    await new Table().init()
  }
}