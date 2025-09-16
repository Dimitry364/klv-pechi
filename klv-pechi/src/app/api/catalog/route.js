import { getCatalogSections } from '@/lib/CategoryServiceSanity';
export async function GET() {
  return Response.json(await getCatalogSections());
}
