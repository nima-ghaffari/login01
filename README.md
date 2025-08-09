# Login 01 


[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT) [![Tech: HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) [![Tech: CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS) [![Tech: JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## Developer

-   **Nima Ghaffari**
-   **Telegram**: [@nimaghaffari01](https://t.me/nimaghaffari01)
-   **Maybe this login page for computer website**
---

## Core Features

-   **Architectural Glassmorphism**: Utilizes the `backdrop-filter` CSS property to create a frosted-glass effect, establishing a clear visual hierarchy between the UI elements and the animated background.
-   **Generative Canvas Rendering Engine**: A high-performance animation loop on the HTML5 Canvas renders two distinct, layered effects: a generative "Matrix" rain and a dynamic, tapering cursor trail.
-   **Asynchronous Debounced Validation**: Implements real-time form validation that provides immediate feedback on user input. Performance is optimized via a `debounce` function, which prevents excessive validation calls during continuous input events.
-   **State-Driven Visual Feedback**: The entire theme, including the background animation and form container's `box-shadow`, dynamically changes color based on the application's validation state (blue for default, red for error, green for success).
-   **Fluid SPA Transitions**: Employs animated transitions for switching between the login and registration views within a single page, creating a seamless user flow.
-   **Graceful Degradation**: The cursor-based trail animation is programmatically disabled on touch-enabled devices to ensure an optimal and performant mobile user experience.
-   **Enhanced User Engagement**:
    -   Leverages the Page Visibility API to alter the document title when the tab is inactive, encouraging users to return.
    -   Includes a fixed-position contact link for easy access.

---

## Technology Stack

The application is architected using foundational web technologies to demonstrate core proficiency without reliance on external frameworks.

-   **HTML5**: Provides the semantic structure for the application, including the `<canvas>` element which serves as the rendering surface for all generative animations.
-   **CSS3**: Implements the complete visual design, including advanced features such as:
    -   **Flexbox**: For robust and responsive centering of the primary UI container.
    -   **`backdrop-filter`**: The core property for achieving the glassmorphism effect.
    -   **Transitions & Keyframes**: To orchestrate fluid animations for view transitions, shadow color shifts, and the initial container entrance.
    -   **Media Queries**: To ensure a fully responsive layout, with specific adjustments for smaller viewports and interaction modes (`pointer: coarse`).
-   **Vanilla JavaScript (ES6+)**: Manages the entire application logic, including:
    -   **DOM Manipulation**: Dynamically applying CSS classes and updating content based on user interaction and application state.
    -   **Event Handling**: Orchestrating all user-facing events, from input and submission to mouse movement.
    -   **State Management**: A client-side finite state machine controls all visual feedback loops.
    -   **Canvas API**: For high-performance, pixel-level control and rendering of the background and mouse trail animations.
    -   **Page Visibility API**: For implementing the dynamic tab title feature.

---

## File Structure

The project maintains a logical separation of concerns, isolating structure, presentation, and behavior.

```

├── image
│   └── icon.png
└── loginPage1
    └── src
        ├── styles
        │   └── style.css
        ├── scripts
        │   └── main.js
        ├── index.html
        └── info.html
        └── README.md
        
```

---

## Local Development

**Prerequisites:**
-   A modern web browser with support for ES6+ and the Canvas API.
-   A code editor (e.g., Visual Studio Code).

**Installation & Execution:**
1.  Clone or download the repository to your local machine.
2.  Open the `loginPage1/src/index.html` file in your web browser.

**Mobile & Network Testing:**
For testing on physical mobile devices, a local development server is required.
1.  In Visual Studio Code, install the **Live Server** extension.
2.  Right-click on `index.html` and select `Open with Live Server`.
3.  On a mobile device connected to the same Wi-Fi network, navigate to `http://<YOUR_COMPUTER_IP>:<PORT>` (e.g., `http://192.168.1.100:5501`).

---

## Technical Architecture

### 1. Client-Side State Management

Visual feedback is orchestrated via a simple finite state machine, managed by the `backgroundState` variable in JavaScript. This variable transitions between several states: `'default'`, `'error'`, `'success'`, and `'switching'`.

A centralized controller function, `setBackgroundState(state, duration)`, manages these transitions. Upon invocation, it:
1.  Updates the `backgroundState` variable.
2.  Manipulates the CSS classes on the `.form-container` element (e.g., adds `.error-shadow`), triggering a CSS `transition` for the `box-shadow` property.
3.  This state is read by the canvas rendering pipeline on each frame to update animation colors.
4.  A `setTimeout` is utilized to manage transient UI states, automatically reverting to `'default'` after a specified duration. This design pattern ensures that visual feedback is consistent and synchronized across both CSS and Canvas-rendered elements.

### 2. Canvas Rendering Pipeline

All animations are rendered within a single `draw()` function, which is executed recursively using `requestAnimationFrame` for optimal performance and synchronization with the browser's paint cycle.

-   **The 'Matrix Rain' Effect**: The persistence illusion of the "rain" is achieved not by drawing strings, but by rendering a semi-transparent overlay (`rgba(0,0,0,0.1)`) across the entire canvas each frame. This technique of alpha blending causes previously rendered frames to fade gradually, creating a performant and visually appealing motion-blur trail. The color of the head of each trail is determined by the application's current `backgroundState`.

-   **The Tapering Mouse Trail**: This effect is a procedurally generated visual.
    1.  A FIFO (First-In, First-Out) buffer, `mousePath`, stores the last `N` mouse coordinates.
    2.  On each frame, the rendering engine iterates through this buffer, drawing short line segments between consecutive points.
    3.  The tapering effect is achieved by programmatically calculating the `lineWidth` and `strokeStyle` alpha value for each segment. These values are directly proportional to the segment's index in the buffer, creating a smooth gradient of width and opacity along the path's length. `lineCap = 'round'` ensures a fluid appearance.

### 3. User Interaction & Event Handling

-   **Debounced Validation**: To optimize performance, user input validation is rate-limited using a `debounce` function. This higher-order function delays the execution of the validation logic until the user has paused typing, preventing the expensive validation process from running on every keystroke and ensuring a smooth user experience.

-   **Animated View Transitions**: The `switchForms` function orchestrates the animated transition between the login and sign-up views. It is a timed sequence that uses JavaScript's `setTimeout` to synchronize with CSS transitions. The function applies a series of CSS classes to trigger the animations for shadows, background colors, and form opacity, ensuring a cohesive and polished transition.




