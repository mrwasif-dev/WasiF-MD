import { settings } from "../config/settings.js"

export async function messageHandler(sock, msg) {
  if (!msg.message) return
  if (msg.key.fromMe) return

  const text =
    msg.message.conversation ||
    msg.message.extendedTextMessage?.text ||
    ""

  const from = msg.key.remoteJid

  if (text === `${settings.prefix}menu`) {
    await sock.sendMessage(from, {
      text: `🤖 *${settings.botName}*

Commands:
• ${settings.prefix}menu
• ${settings.prefix}ping

Owner: ${settings.ownerName}`
    })
  }

  if (text === `${settings.prefix}ping`) {
    await sock.sendMessage(from, {
      text: "🏓 Pong!"
    })
  }
}
