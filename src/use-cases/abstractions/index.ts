export * from "./regular-sending-prayer-times/get-all-execute-time-chats-for-sending-use-case"
export * from "./regular-sending-prayer-times/mass-send-prayer-times-to-telegram-channels-use-case"
export * from "./regular-sending-prayer-times/send-prayer-times-to-telegram-channel-use-case"

export interface UseCase<T, R> {
    execute(params: T): Promise<R>
}