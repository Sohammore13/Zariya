import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import { ImageIcon, SendIcon, X } from "lucide-react";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // base64 string
  const fileInputRef = useRef(null);
  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    await sendMessage({
      text: text.trim() || undefined,
      image: imagePreview || undefined,
    });

    setText("");
    removeImage();
  };

  const canSend = text.trim() || imagePreview;

  return (
    <div className="p-4 border-t border-gray-100 bg-white">
      {/* Image preview */}
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-start gap-2">
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-24 w-24 object-cover rounded-xl border border-gray-200 shadow-sm"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors shadow"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex space-x-3 items-center">
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Image picker button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex-shrink-0 text-gray-400 hover:text-indigo-500 transition-colors p-2 rounded-lg hover:bg-indigo-50"
          title="Attach image"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        {/* Text input */}
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            isSoundEnabled && playRandomKeyStrokeSound();
          }}
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
          placeholder="Type your message..."
        />

        {/* Send button */}
        <button
          type="submit"
          disabled={!canSend}
          className="bg-indigo-600 text-white rounded-xl px-4 py-2.5 font-medium hover:bg-indigo-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          <SendIcon className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
