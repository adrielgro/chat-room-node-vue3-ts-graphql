import { Resolver, Query, Arg, Mutation, Subscription, PubSubEngine, PubSub, Root } from "type-graphql";
import { CreateMessageInput } from "./dto/create-message.input";
import { Message } from "./entities/message";
import messageService from "./message.service";
import MessageService from "./message.service";
import { NewMessageSubscription } from "./dto/new-message.subscription";

@Resolver(Message)
class MessageResolver {
  private messageService: MessageService = new messageService();

  @Subscription(() => NewMessageSubscription, {
    topics: ({ args }) => args.topic,
  })
  async newMessage(
    @Root() message: Message,
    @Arg("topic") _topic: string,
  ): Promise<Message> {
    return {
      ...message,
      createdAt: new Date(),
    };
  }

  @Mutation(() => Message)
  async createMessage(
    @Arg("createMessageInput") createMessageInput: CreateMessageInput,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Message> {
    return await this.messageService.createMessage(createMessageInput, pubSub);
  }

  @Query(() => [Message])
  async getAllMessages(): Promise<Message[]> {
    return await this.messageService.getAllMessages();
  }

  @Query(() => [Message])
  async getMessagesByRoom(@Arg("id") id: string): Promise<Message[]> {
    return await this.messageService.getMessagesByRoom(id);
  }

  @Query(() => Message, { nullable: true })
  async getMessage(@Arg("id") id: string): Promise<Message | null> {
    return await this.messageService.getMessageById(id);
  }
}

export default MessageResolver;
