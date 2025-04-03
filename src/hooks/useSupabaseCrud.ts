
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export function useSupabaseCrud<T extends { id?: string }>(tableName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getAll = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from(tableName)
        .select('*');
      
      if (error) throw error;
      
      return data as T[];
    } catch (err) {
      const errorObject = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(errorObject);
      console.error(`Error fetching ${tableName}:`, err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return data as T;
    } catch (err) {
      const errorObject = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(errorObject);
      console.error(`Error fetching ${tableName} by id:`, err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const create = async (item: Omit<T, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      
      // Generate a UUID if id is not provided
      const newItem = { 
        ...item, 
        id: uuidv4() 
      } as T;
      
      const { data, error } = await supabase
        .from(tableName)
        .insert([newItem])
        .select();
      
      if (error) throw error;
      
      return data?.[0] as T;
    } catch (err) {
      const errorObject = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(errorObject);
      console.error(`Error creating ${tableName}:`, err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, item: Partial<T>) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from(tableName)
        .update(item)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      return data?.[0] as T;
    } catch (err) {
      const errorObject = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(errorObject);
      console.error(`Error updating ${tableName}:`, err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      return true;
    } catch (err) {
      const errorObject = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(errorObject);
      console.error(`Error deleting ${tableName}:`, err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { 
    getAll, 
    getById, 
    create, 
    update, 
    remove, 
    loading, 
    error 
  };
}
