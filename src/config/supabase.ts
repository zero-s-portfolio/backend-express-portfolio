import { createClient } from "@supabase/supabase-js";
import WebSocket  from "ws";

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  {
    realtime: {
      transport: WebSocket  as any,
    },
  }
);