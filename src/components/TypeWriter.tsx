import { useState, useEffect, memo } from "react";

interface TypeWriterProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  delayBetweenTexts?: number;
  className?: string;
  cursorClassName?: string;
  loop?: boolean;
}

function TypeWriter({
  texts,
  speed = 100,
  deleteSpeed = 50,
  delayBetweenTexts = 2000,
  className = "",
  cursorClassName = "",
  loop = true,
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, delayBetweenTexts);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false);
        if (loop || textIndex < texts.length - 1) {
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
        return;
      }

      const deleteTimer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, deleteSpeed);
      return () => clearTimeout(deleteTimer);
    }

    if (displayText === currentText) {
      if (loop || textIndex < texts.length - 1) {
        setIsPaused(true);
      }
      return;
    }

    const typeTimer = setTimeout(() => {
      setDisplayText(currentText.slice(0, displayText.length + 1));
    }, speed);

    return () => clearTimeout(typeTimer);
  }, [displayText, textIndex, isDeleting, isPaused, texts, speed, deleteSpeed, delayBetweenTexts, loop]);

  return (
    <span className={className}>
      {displayText}
      <span
        className={`inline-block w-[3px] h-[1em] bg-current ml-1 animate-blink ${cursorClassName}`}
        style={{ verticalAlign: "text-bottom" }}
      />
    </span>
  );
}

export default memo(TypeWriter);
