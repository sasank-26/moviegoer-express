
import { createClient } from '@supabase/supabase-js';

// Hardcoded Supabase credentials
const supabaseUrl = 'https://yupqneetxjenuigzjggx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1cHFuZWV0eGplbnVpZ3pqZ2d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NTM1NDUsImV4cCI6MjA1OTIyOTU0NX0.cCoZ6F_CHUivPtnEHfzlMR_o02h4P9_rOK53TTBrIfE';

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };
