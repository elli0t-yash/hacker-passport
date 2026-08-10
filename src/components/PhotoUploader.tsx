import { useRef, useState } from 'react';
import { Camera } from 'lucide-react';

const MAX_BYTES = 8 * 1024 * 1024;

export default function PhotoUploader({ photo, onChange }: { photo: string; onChange: (dataUrl: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('SIGNAL LOST. TRY AGAIN.');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('FILE TOO LARGE. TRY UNDER 8MB.');
      return;
    }
    setError('');
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <div className="photo-uploader-wrap">
      <button
        type="button"
        className={`photo-uploader${dragging ? ' is-dragging' : ''}${photo ? ' has-photo' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        {photo ? (
          <>
            <img src={photo} alt="Your uploaded portrait" />
            <span className="photo-uploader-replace"><Camera size={14} /> REPLACE PHOTO</span>
          </>
        ) : (
          <div className="photo-uploader-empty">
            <Camera size={26} />
            <p>DROP YOUR FACE HERE</p>
            <span>We&apos;ll handle the crop.</span>
          </div>
        )}
      </button>
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
