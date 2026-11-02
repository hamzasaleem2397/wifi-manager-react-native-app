# Changelog

## Version 1.0.0 - Initial Release

### Added
- ✅ Complete authentication system with router login
- ✅ Device management screen with list of connected devices
- ✅ Device blocking/unblocking functionality
- ✅ Device aliasing (custom nicknames)
- ✅ Dark and light theme support
- ✅ System theme preference support
- ✅ Persistent theme storage with AsyncStorage
- ✅ Pull-to-refresh on device list
- ✅ Settings screen for theme configuration
- ✅ Session management with cookies
- ✅ Logout functionality
- ✅ TypeScript support throughout
- ✅ Error handling with user-friendly alerts
- ✅ Loading states and empty states
- ✅ Responsive design for various screen sizes
- ✅ Safe area support for modern devices

### API Integration
- Login endpoint (`POST /api/auth/login`)
- Logout endpoint (`POST /api/auth/logout`)
- Get devices endpoint (`GET /api/devices`)
- Block/unblock endpoint (`POST /api/block`)
- Set alias endpoint (`POST /api/alias`)

### Documentation
- Complete README with project overview
- Quick Start guide for easy setup
- API documentation reference
- Configuration examples

### UI Components
- Custom themed text component
- Custom themed view component
- Device card component
- Login form with validation
- Settings form with theme toggle

### Technical Details
- React Native 0.88.1
- Expo ~58.0
- React 19.3.0
- TypeScript 6.0.3
- AsyncStorage for persistence
- Axios for HTTP requests
- Expo Router for navigation
- Context API for state management

### Removed
- Demo/template files from fresh Expo project
- Unused example screens
- Tutorial components
