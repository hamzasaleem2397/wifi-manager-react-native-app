# WiFi Manager Mobile App

A React Native mobile application for managing WiFi-connected devices through a router API. Built with Expo and React Native.

## Features

- 🔐 Router authentication with session management
- 📱 View all connected devices with real-time status
- 🏷️ Set custom aliases/nicknames for devices
- 🚫 Block/unblock devices from WiFi access
- 🎨 Dark and light theme support with system preference
- 💾 Persistent theme settings with AsyncStorage
- 🔄 Pull-to-refresh device list
- 📊 Device details including IP, MAC, hostname, port, and lease time

## Tech Stack

- **Framework:** React Native with Expo
- **Routing:** Expo Router (file-based routing)
- **State Management:** React Context API
- **Storage:** AsyncStorage
- **HTTP Client:** Axios
- **UI:** Native React Native components with custom theming

## Prerequisites

- Node.js 18+
- Yarn or npm
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
yarn install
```

3. Update the API base URL in `src/services/api.ts`:

```typescript
const API_BASE_URL = "http://your-router-ip:3000";
```

## Running the App

Start the development server:

```bash
yarn start
```

Run on specific platforms:

```bash
# iOS
yarn ios

# Android
yarn android

# Web
yarn web
```

## API Configuration

The app connects to a router management API. Update the base URL in `src/services/api.ts` to match your backend server.

Default credentials are pre-filled in the login screen:

- Router IP: `192.168.100.1`
- Username: `telecomadmin`
- Password: (enter your router password)

## Project Structure

```
src/
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout with providers
│   ├── index.tsx          # Auth router
│   ├── login.tsx          # Login screen
│   ├── devices.tsx        # Device list screen
│   └── settings.tsx       # Settings screen
├── components/            # Reusable components
│   ├── DeviceCard.tsx
│   ├── themed-text.tsx
│   └── themed-view.tsx
├── contexts/              # React contexts
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── services/              # API services
│   └── api.ts
├── types/                 # TypeScript types
│   └── index.ts
└── constants/             # Theme and constants
    └── theme.ts
```

## API Endpoints

See `apidoc.md` for complete API documentation. Key endpoints:

- `POST /api/auth/login` - Authenticate with router
- `POST /api/auth/logout` - Logout and destroy session
- `GET /api/devices` - Get list of connected devices
- `POST /api/block` - Block/unblock a device
- `POST /api/alias` - Set device alias

## Theme Support

The app supports three theme modes:

- **Light:** Light color scheme
- **Dark:** Dark color scheme
- **System:** Automatically follows device theme preference

Theme preference is persisted using AsyncStorage.

## License

MIT

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
