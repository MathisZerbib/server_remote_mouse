# server_remote_mouse

This is the server component for the `mouse_control_app` project. It handles communication between the mobile application and the computer to control the mouse and volume remotely using WebSocket.

## Project Structure

The project is structured as follows:
- `/server` - The server component of the project
- `/mouse_control_app` - The mobile application component of the project

The server component is responsible for handling communication between the mobile application and the computer to control the mouse and volume remotely.

The mobile application component is responsible for sending commands to the server to control the mouse and volume remotely.

## Technologies

- **Flutter** - A framework for building native applications for mobile, web, and desktop from a single codebase.
- **Node.js** - A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express** - A web application framework for Node.js.
- **Socket.IO** - A library that enables real-time, bidirectional, and event-based communication between the browser and the server.

## Getting Started

### Prerequisites

- Node.js (version 14.x or later)
- npm (version 6.x or later)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/mouse_control_app.git
    cd mouse_control_app/server
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Server

To start the server, run the following command:
```sh
node server.js
```

The server will start on port `8765`. You can change the port by modifying the `server.js` file.

## WebSocket Events

- `accel_mouse_event` - Move the mouse cursor. Requires `x` and `y` coordinates in the event data.
- `mouse_click` - Simulate a mouse click. Requires `type` (left, right, middle) in the event data.
- `mouse_double_click` - Simulate a double mouse click.
- `keyboard_input` - Simulate keyboard input. Requires `character` in the event data.
- `volume_up` - Increase the volume.
- `volume_down` - Decrease the volume.
- `set_mute` - Mute or unmute the volume. Requires `muted` (true or false) in the event data.
- `scroll` - Scroll the mouse. Requires `deltaY` in the event data.
- `zoom` - Zoom in or out. Requires `scale` in the event data.

### Example WebSocket Events

- Move the mouse cursor:
    ```javascript
    socket.emit('accel_mouse_event', { x: 100, y: 200 });
    ```

- Simulate a mouse click:
    ```javascript
    socket.emit('mouse_click', { type: 'left' });
    ```

- Increase the volume:
    ```javascript
    socket.emit('volume_up');
    ```

- Decrease the volume:
    ```javascript
    socket.emit('volume_down');
    ```

- Mute the volume:
    ```javascript
    socket.emit('set_mute', { muted: true });
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.