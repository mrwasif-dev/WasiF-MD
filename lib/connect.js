import makeWASocket, {
  useMultiFileAuthState
} from "@whiskeysockets/baileys"

import P from "pino"
import { messageHandler } from "../handlers/message.js"

export async function connectBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth")

  const sock = makeWASocket({
    auth: state,
    logger: P({ level: "silent" }),
    printQRInTerminal: true
  })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("messages.upsert", async ({ messages }) => {
    if (!messages[0]) return
    await messageHandler(sock, messages[0])
  })
}
