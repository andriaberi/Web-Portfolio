import { useEffect, useState } from "react";

const words = [
    "Computer Science Student",
    "Problem Solver",
    "Web Developer",
];

export default function HeroTyping() {
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];
        const speed = isDeleting ? 50 : 100;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setText(currentWord.substring(0, text.length + 1));

                if (text === currentWord) {
                    setTimeout(() => setIsDeleting(true), 1000);
                }
            } else {
                setText(currentWord.substring(0, text.length - 1));

                if (text === "") {
                    setIsDeleting(false);
                    setWordIndex((prev) => (prev + 1) % words.length);
                }
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex]);

    return (
        <p className="typing">
            {text}
            <div className="cursor"></div>
        </p>
    );
}
