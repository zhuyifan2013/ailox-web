import { SearchClient } from "./SearchClient"

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Search</h1>
        <p className="text-slate-400 text-sm mt-1">
          Semantic search across all your events and memories.
        </p>
      </header>
      <SearchClient />
    </div>
  )
}
