import enMessages from "./messages/en.json";

type MessageId = keyof typeof enMessages;

/**
 * Convenience function that provides type checking for message ids.
 */
const getMessageId = (id: MessageId) => id;

export { getMessageId };
