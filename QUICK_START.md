# Quick Start Guide

## Setup

1. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

2. **Configure API endpoint**
   
   Edit `src/config.ts` and update the `API_BASE_URL` to point to your backend server:
   ```typescript
   API_BASE_URL: 'http://YOUR_SERVER_IP:3000'
   ```

3. **Start the development server**
   ```bash
   yarn start
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or press `i` for iOS simulator
   - Or press `a` for Android emulator

## First Time Login

The app will show a login screen with pre-filled credentials:
- **Router IP**: 192.168.100.1 (can be changed)
- **Username**: telecomadmin (can be changed)
- **Password**: (enter your router password)

## Features

### Devices Screen
- View all connected devices with their status (Online/Offline)
- See device details: IP, MAC address, hostname, port, lease time
- Pull down to refresh the device list
- Tap "Rename" to set a custom name for any device
- Tap "Block" to prevent a device from connecting to WiFi
- Tap "Unblock" to allow a blocked device to connect again

### Settings Screen
- Choose your preferred theme:
  - **Light**: Always use light mode
  - **Dark**: Always use dark mode
  - **System**: Follow device system preference
- Theme preference is saved automatically

## Theme Toggle

The app includes a beautiful dark mode that:
- Respects system preferences by default
- Can be manually set to light or dark mode
- Saves your preference using AsyncStorage
- Provides consistent colors across all screens

## Troubleshooting

### Cannot connect to router
- Make sure your backend API server is running
- Verify the API_BASE_URL in `src/config.ts`
- Check that your mobile device can reach the server (same network or proper port forwarding)

### Session expired
- The app uses session cookies for authentication
- If you see "Unauthorized" errors, login again
- Sessions are managed by your backend server

### Devices not loading
- Verify your router credentials are correct
- Check that the backend server can connect to your router
- Pull down to refresh the list

## Development

### File Structure
```
src/
├── app/              # Screens (Expo Router)
├── components/       # Reusable UI components
├── contexts/         # React contexts (Auth, Theme)
├── services/         # API client
├── types/            # TypeScript types
├── constants/        # Theme colors and constants
└── config.ts         # App configuration
```

### Adding New Features
1. Add new API methods in `src/services/api.ts`
2. Create new screens in `src/app/`
3. Add new types in `src/types/index.ts`
4. Update theme colors in `src/constants/theme.ts` if needed

## Building for Production

### iOS
```bash
eas build --platform ios
```

### Android
```bash
eas build --platform android
```

Note: You'll need to configure EAS Build. See [Expo documentation](https://docs.expo.dev/build/setup/) for details.
