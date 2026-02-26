import { Command } from '../domain/command.base'
import { Query } from '../domain/query.base'

export abstract class UseCase<Input extends Command | Query, Output = void> {
  abstract execute(input: Input): Promise<Output>
}
