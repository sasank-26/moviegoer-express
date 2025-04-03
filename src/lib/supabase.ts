
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if environment variables are available
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

// Create a dummy client if environment variables are not set
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
