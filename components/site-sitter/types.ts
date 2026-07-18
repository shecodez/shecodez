export interface FAQ {
  question: string
  answer: string
}

export interface ChatMessage {
  message: string
  answers: string[]
  responses: string[]
}

export interface SiteSitterCommand {
  label: string
  timeout?: number
}
