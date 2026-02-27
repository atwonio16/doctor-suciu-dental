import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type {
    Service,
    Doctor,
    BeforeAfter,
    GalleryImage,
    Review,
    FAQ,
    BlogPost,
} from '../lib/supabase';

/**
 * Generic hook to fetch data from a Supabase table with realtime updates.
 * Used by all public-facing sections to replace localStorage reads.
 */
export function useSupabaseTable<T>(
    table: string,
    options?: {
        filterColumn?: string;
        filterValue?: any;
        orderBy?: string;
        ascending?: boolean;
    }
): { data: T[]; loading: boolean; error: string | null; refetch: () => void } {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        let cancelled = false;

        const doFetch = async () => {
            setLoading(true);
            setError(null);

            try {
                if (!isSupabaseConfigured) {
                    if (!cancelled) {
                        setError('Supabase is not configured');
                        setData([]);
                        setLoading(false);
                    }
                    return;
                }

                let query = supabase.from(table).select('*');

                if (options?.filterColumn && options?.filterValue !== undefined) {
                    query = query.eq(options.filterColumn, options.filterValue);
                }

                query = query.order(options?.orderBy || 'order_index', {
                    ascending: options?.ascending ?? true,
                });

                const { data: result, error: err } = await query;

                if (!cancelled) {
                    if (err) {
                        console.error(`Error fetching ${table}:`, err);
                        setError(err.message);
                        setData([]);
                    } else {
                        setData((result as T[]) || []);
                    }
                }
            } catch (e) {
                if (!cancelled) {
                    const msg = e instanceof Error ? e.message : 'Unknown error';
                    console.error(`Error fetching ${table}:`, msg);
                    setError(msg);
                    setData([]);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        doFetch();

        return () => {
            cancelled = true;
        };
    }, [table, options?.filterColumn, options?.filterValue, options?.orderBy, options?.ascending]);

    useEffect(() => {
        fetchData();

        // Subscribe to realtime changes
        if (isSupabaseConfigured) {
            const channel = supabase
                .channel(`${table}_changes`)
                .on(
                    'postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                        table: table,
                    },
                    (payload) => {
                        console.log(`${table} changed:`, payload);
                        // Refetch data when any change occurs
                        fetchData();
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        }
    }, [fetchData, table]);

    return { data, loading, error, refetch: fetchData };
}

// ============================================
// Specific hooks for each public data type
// ============================================

export function usePublicServices() {
    return useSupabaseTable<Service>('services', {
        filterColumn: 'is_active',
        filterValue: true,
        orderBy: 'order_index',
    });
}

export function usePublicDoctors() {
    return useSupabaseTable<Doctor>('doctors', {
        filterColumn: 'is_active',
        filterValue: true,
        orderBy: 'order_index',
    });
}

export function usePublicBeforeAfter() {
    return useSupabaseTable<BeforeAfter>('before_after', {
        filterColumn: 'is_active',
        filterValue: true,
        orderBy: 'order_index',
    });
}

export function usePublicGallery() {
    return useSupabaseTable<GalleryImage>('gallery', {
        filterColumn: 'is_active',
        filterValue: true,
        orderBy: 'order_index',
    });
}

export function usePublicReviews() {
    return useSupabaseTable<Review>('reviews', {
        filterColumn: 'is_published',
        filterValue: true,
        orderBy: 'order_index',
    });
}

export function usePublicFAQ() {
    return useSupabaseTable<FAQ>('faq', {
        filterColumn: 'is_active',
        filterValue: true,
        orderBy: 'order_index',
    });
}

export function usePublicBlogPosts() {
    return useSupabaseTable<BlogPost>('blog_posts', {
        filterColumn: 'is_published',
        filterValue: true,
        orderBy: 'published_at',
        ascending: false,
    });
}
