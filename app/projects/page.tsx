import { createClient } from '@/utils/supabase/server'

export default async function Notes() {
  const supabase = createClient();
  const { data: projects } = await supabase.from("projects").select();

  return <pre>{JSON.stringify(projects, null, 2)}</pre>
}