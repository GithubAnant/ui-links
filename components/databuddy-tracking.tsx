"use client";

import { Databuddy } from "@databuddy/sdk/react";

const DATABUDDY_CLIENT_ID = "7fa30d16-88db-49bd-b551-168aebee45b7";

export function DatabuddyTracking() {
  return (
    <Databuddy
      clientId={DATABUDDY_CLIENT_ID}
      trackInteractions
    />
  );
}
