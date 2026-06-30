import { useRef } from 'react'

export const useMouseTail = () => {
    const lastCoords = useRef({ x: 0, y: 0 })

    const labels = [
        ["let's unlock", "#ff8400"],
        ["prepare", "#ffb400"],
        ["smarter", "#67e884"],
        ["let's bridge", "#61d9ff"],
        ["a gap", "#1565d8"],
        ["an idea", "#b88cff"],
        ["this is", "#1464ff"],
        ["interview", "#af7bff"],
        ["clarity", "#ff9ec2"],
        ["confidence", "#ff5252"]
    ];

    const handleMouseMove = (e) => {
        if (e.target.closest('.form-container')) return;

        const dx = e.clientX - lastCoords.current.x;
        const dy = e.clientY - lastCoords.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) return;

        lastCoords.current = { x: e.clientX, y: e.clientY };

        const [text, color] = labels[Math.floor(Math.random() * labels.length)];
        const div = document.createElement("div");
        div.className = "card";
        div.innerText = text;
        div.style.background = color;
        div.style.left = `${e.clientX + (Math.random() * 18 - 9)}px`;
        div.style.top = `${e.clientY + (Math.random() * 18 - 9)}px`;
        div.style.setProperty("--r", `${Math.random() * 18 - 9}deg`);
        document.body.appendChild(div);

        setTimeout(() => {
            div.remove();
        }, 1100);
    }

    return handleMouseMove;
}
