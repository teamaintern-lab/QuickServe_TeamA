import { useState, useEffect, useRef } from "react";
import { sendChatMessage, getChatMessages } from "../services/api";
import "../styles/chat.css";

export default function Chat({ bookingId, userId, userName, booking, isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastMessageCount, setLastMessageCount] = useState(0);
  const [showNewMessageNotification, setShowNewMessageNotification] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && bookingId) {
      loadMessages();
      // Set up polling for new messages every 5 seconds
      const interval = setInterval(loadMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen, bookingId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const response = await getChatMessages(bookingId);
      const newMessages = response.data;
      if (newMessages.length > lastMessageCount && lastMessageCount > 0) {
        setShowNewMessageNotification(true);
        setTimeout(() => setShowNewMessageNotification(false), 3000);
      }
      setLastMessageCount(newMessages.length);
      setMessages(newMessages);
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageToSend = newMessage.trim();
    setNewMessage("");
    setLoading(true);

    // Optimistically add the message to UI
    const tempMessage = {
      id: Date.now(), // temporary ID
      bookingId,
      senderId: userId,
      receiverId: null, // will be set by server
      message: messageToSend,
      sentAt: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempMessage]);

    try {
      await sendChatMessage(bookingId, messageToSend, userId);
      // Reload messages to get the real message from server
      await loadMessages();
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again.");
      // Remove the optimistic message on error
      setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
      setNewMessage(messageToSend); // Restore the message
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  // Determine the chat partner name based on user role
  const isCustomer = userId === booking?.userId;
  const chatPartnerName = isCustomer ? (booking?.providerName || booking?.providerEmail || 'Service Provider') : (booking?.customerName || 'Customer');

  return (
    <div className="chat-overlay" onClick={onClose}>
      <div className="chat-container" onClick={(e) => e.stopPropagation()}>
        <div className="chat-header">
          <h3>Chat with {chatPartnerName || 'Unknown'}</h3>
          <button className="chat-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="chat-messages">
          {showNewMessageNotification && (
            <div className="new-message-notification">
              New message received!
            </div>
          )}
          {messages.length === 0 ? (
            <div className="no-messages">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg) => {
              // Determine message alignment
              let messageClass;
<<<<<<< HEAD
=======
              let timeClass;
>>>>>>> 6fafcb9 (updated project code)
              if (isCustomer) {
                // For customer: own messages right, received left
                if (String(msg.senderId) === String(userId)) {
                  messageClass = "provider"; // right
<<<<<<< HEAD
                } else {
                  messageClass = "customer"; // left
=======
                  timeClass = "sent";
                } else {
                  messageClass = "customer"; // left
                  timeClass = "received";
>>>>>>> 6fafcb9 (updated project code)
                }
              } else {
                // For provider: customer messages left, provider messages right
                if (String(msg.senderId) === String(booking.userId)) {
                  messageClass = "customer"; // left
<<<<<<< HEAD
                } else {
                  messageClass = "provider"; // right
                }
              }

              // Determine sender name
              let senderName;
              if (String(msg.senderId) === String(userId)) {
                senderName = userName;
              } else {
                senderName = chatPartnerName;
              }

              return (
                <div
                  key={msg.id}
                  className={`chat-message ${messageClass}`}
                >
                  <div className="message-content">
                    <span className="message-sender">{senderName}</span>
=======
                  timeClass = "received";
                } else {
                  messageClass = "provider"; // right
                  timeClass = "sent";
                }
              }

              return (
                <div
                  key={msg.id}
                  className={`chat-message ${messageClass} ${timeClass}`}
                >
                  <div className="message-content">
>>>>>>> 6fafcb9 (updated project code)
                    <p>{msg.message}</p>
                    <span className="message-time">
                      {formatTime(msg.sentAt)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
            maxLength={1000}
          />
          <button
            type="submit"
            disabled={loading || !newMessage.trim()}
            className="send-btn"
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}