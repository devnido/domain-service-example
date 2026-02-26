import { Message } from 'src/base/lib/domain/message.base'

export interface MqClientPort {
  sendMessage(message: Message): Promise<void>
}
