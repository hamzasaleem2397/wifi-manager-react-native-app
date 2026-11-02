## API Documentation

All API endpoints require authentication via session cookie. Login first to obtain a session.

### Authentication

#### POST `/api/auth/login`

Login with router credentials.

**Request Body:**

```json
{
  "ip": "192.168.100.1",
  "username": "telecomadmin",
  "password": "your-password"
}
```

**Response (Success - 200):**

```json
{
  "ok": true
}
```

**Response (Error - 401):**

```json
{
  "error": "Invalid router credentials or unable to connect to router."
}
```

**Response (Error - 400):**

```json
{
  "error": "Router IP, username, and password are required."
}
```

#### POST `/api/auth/logout`

Logout and destroy session.

**Response (200):**

```json
{
  "ok": true
}
```

---

### Devices

#### GET `/api/devices`

Get list of all connected devices with their status.

**Response (200):**

```json
{
  "devices": [
    {
      "mac": "AA:BB:CC:DD:EE:FF",
      "ip": "192.168.100.45",
      "hostname": "pixel-7",
      "status": "Online",
      "port": "SSID0",
      "leaseTime": "12:55",
      "alias": "Dad's Phone",
      "blocked": false
    }
  ]
}
```

**Response (401):**

```json
{
  "error": "Unauthorized"
}
```

**Response (502):**

```json
{
  "error": "Could not authenticate with router"
}
```

**Device Fields:**

- `mac` (string): Device MAC address
- `ip` (string): Device IP address
- `hostname` (string): Device hostname from DHCP
- `status` (string): "Online" or "Offline"
- `port` (string): Connection port (e.g., "SSID0", "LAN1")
- `leaseTime` (string, optional): DHCP lease remaining time
- `alias` (string | null): Custom nickname for the device
- `blocked` (boolean): Whether device is blocked from WiFi

---

### Device Blocking

#### POST `/api/block`

Block or unblock a device from connecting to WiFi.

**Request Body:**

```json
{
  "mac": "AA:BB:CC:DD:EE:FF",
  "action": "block"
}
```

**Parameters:**

- `mac` (string, required): Device MAC address (case-insensitive)
- `action` (string, required): Either "block" or "unblock"

**Response (Success - 200):**

```json
{
  "ok": true
}
```

**Response (Error - 400):**

```json
{
  "error": "mac and action are required."
}
```

**Response (Error - 401):**

```json
{
  "error": "Unauthorized"
}
```

**Response (Error - 500):**

```json
{
  "error": "Failed to block device on router"
}
```

**Notes:**

- Blocking adds the MAC to the router's WLAN MAC filter blacklist
- Unblocking removes the MAC from the router's filter
- Changes take effect immediately
- Blocked devices will be disconnected from WiFi

---

### Device Aliases

#### POST `/api/alias`

Add or update a friendly nickname for a device.

**Request Body:**

```json
{
  "mac": "AA:BB:CC:DD:EE:FF",
  "alias": "Dad's Phone"
}
```

**Parameters:**

- `mac` (string, required): Device MAC address
- `alias` (string, required): Friendly name for the device (empty string to remove)

**Response (Success - 200):**

```json
{
  "ok": true
}
```

**Response (Error - 400):**

```json
{
  "error": "mac and alias are required."
}
```

**Response (Error - 401):**

```json
{
  "error": "Unauthorized"
}
```

**Notes:**

- Aliases are stored locally in `data/aliases.json`
- Aliases persist across sessions
- Use empty string to remove an alias
