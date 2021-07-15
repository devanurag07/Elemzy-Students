export const getRandomColor = () => {
  const colors = [
    { foreground: "red", background: "#ff000036" },
    { foreground: "#e65c00", background: " #ffb380" },
    { foreground: "#0052cc", background: " #80b3ff" },
    { foreground: "#3b00b3", background: " #aa80ff" },
  ];

  const randomIdx = Math.floor(Math.random() * colors.length);
  const color = colors[randomIdx];

  return color;
};
