import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set in your Vercel project settings
// or in a local .env.local file:
// NEXT_PUBLIC_SUPABASE_URL="your-project-url"
// NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
