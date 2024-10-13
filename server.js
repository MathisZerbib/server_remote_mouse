const io = require("socket.io")(8765, {
  cors: {
    origin: "*",
  },
});
const robot = require("robotjs");

let mouseMoveBuffer = { x: 0, y: 0 };
const moveInterval = 16; // ~60 FPS
let isMuted = false;
let previousScale = 1; // Initialize previous scale
const zoomSensitivity = 5; // Adjust this value to make zoom less sensitive

setInterval(() => {
  if (mouseMoveBuffer.x !== 0 || mouseMoveBuffer.y !== 0) {
    const currentMousePos = robot.getMousePos();
    robot.moveMouse(
      currentMousePos.x + mouseMoveBuffer.x,
      currentMousePos.y + mouseMoveBuffer.y
    );
    mouseMoveBuffer = { x: 0, y: 0 };
  }
}, moveInterval);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("accel_mouse_event", (data) => {
    mouseMoveBuffer.x += data.x;
    mouseMoveBuffer.y += data.y;
  });

  socket.on("mouse_click", (data) => {
    robot.mouseClick(data.type);
  });

  socket.on("mouse_double_click", () => {
    robot.mouseClick("left", true);
  });

  socket.on("keyboard_input", (data) => {
    if (data.character === "enter") {
      robot.keyTap("enter");
      return;
    }

    if (data.character === "backspace") {
      robot.keyTap("backspace");
      return;
    }

    robot.typeString(data.character);
  });

  socket.on("volume_up", () => {
    robot.keyTap("audio_vol_up");
    console.log("Volume up");
  });

  socket.on("volume_down", () => {
    robot.keyTap("audio_vol_down");
    console.log("Volume down");
  });

  socket.on("set_mute", (data) => {
    isMuted = data.muted;
    console.log(`Muted: ${isMuted}`);
    robot.keyTap("audio_mute");
    io.emit("volume_mute", isMuted);
  });

  socket.on("scroll", (data) => {
    const scrollAmount = Math.round(data.deltaY);
    robot.scrollMouse(0, scrollAmount);
    console.log(`Scrolled: ${scrollAmount}`);
  });

  socket.on("zoom", (data) => {
    console.log("Zoom event received");
    console.log(data);

    const zoomSteps = Math.round(
      (data.scale - previousScale) * zoomSensitivity
    );
    previousScale = data.scale;

    if (zoomSteps > 0) {
      for (let i = 0; i < zoomSteps; i++) {
        robot.keyTap("+", "command");
      }
    } else if (zoomSteps < 0) {
      for (let i = 0; i < Math.abs(zoomSteps); i++) {
        robot.keyTap("-", "command");
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
