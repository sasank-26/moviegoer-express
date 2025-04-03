
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useSupabaseData<T>(
  tableName: string, 
  options: {
    columns?: string,
    eq?: { column: string, value: any },
    limit?: number,
    order?: { column: string, ascending: boolean }
  } = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        let query = supabase
          .from(tableName)
          .select(options.columns || '*');
        
        if (options.eq) {
          query = query.eq(options.eq.column, options.eq.value);
        }
        
        if (options.limit) {
          query = query.limit(options.limit);
        }
        
        if (options.order) {
          query = query.order(options.order.column, {
            ascending: options.order.ascending
          });
        }
        
        const { data: responseData, error } = await query;
        
        if (error) throw error;
        
        // Type assertion to ensure the response data matches the generic type
        setData(responseData as T[] || []);
      } catch (err) {
        const errorObject = err instanceof Error ? err : new Error('An unknown error occurred');
        setError(errorObject);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [tableName, options.columns, options.eq?.column, options.eq?.value, options.limit, options.order?.column, options.order?.ascending]);

  return { data, loading, error };
}

export function useSupabaseItem<T>(
  tableName: string,
  id: string,
  columns?: string
) {
  return useSupabaseData<T>(tableName, {
    columns,
    eq: { column: 'id', value: id }
  });
}
