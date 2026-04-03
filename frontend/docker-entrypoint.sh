#!/bin/sh
# Replace the build-time placeholder with the runtime VITE_API_URL
# Default to http://localhost:3000 if not set
API_URL="${VITE_API_URL:-http://localhost:3000}"

echo "🧭 Oriento: Setting API URL to ${API_URL}"

# Replace placeholder in all JS files
find /usr/share/nginx/html -type f -name '*.js' -exec \
  sed -i "s|__RUNTIME_API_URL__|${API_URL}|g" {} +

# Start nginx
exec nginx -g 'daemon off;'
