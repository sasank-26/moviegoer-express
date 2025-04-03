
import { createClient } from '@supabase/supabase-js';

// Get environment variables or use provided values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yupqneetxjenuigzjggx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1cHFuZWV0eGplbnVpZ3pqZ2d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NTM1NDUsImV4cCI6MjA1OTIyOTU0NX0.cCoZ6F_CHUivPtnEHfzlMR_o02h4P9_rOK53TTBrIfE';

// Check if environment variables or fallback values are available
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

// Create a client with the provided credentials or fallback to mock
let supabase;

if (isSupabaseConfigured) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase environment variables are missing. Using mock client.');
  
  // Create a mock Supabase client with dummy implementations
  supabase = {
    auth: {
      signUp: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      signIn: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      signInWithOAuth: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => ({
      select: () => ({ 
        eq: () => ({ 
          limit: () => ({ 
            order: () => Promise.resolve({ data: [], error: null }) 
          }) 
        })
      }),
      insert: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      update: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      delete: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    }),
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
      }),
    },
  };
}

export { supabase };
