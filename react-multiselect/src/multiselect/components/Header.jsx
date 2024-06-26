import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export const Header = ({ isSelectAll, search, onChangeSearch, onChangeSelectAll }) => {
    const handleSelectAll = () => {
        if (isSelectAll) {
            onChangeSelectAll()
        }
        else {
            onChangeSelectAll("all")
        }
    }
    return (
        <div className="flex justify-between items-center gap-4 mb-2 border-b border-slate-200 pb-2">
            <Checkbox id="select-all" checked={isSelectAll} onCheckedChange={() => handleSelectAll()} />
            <Input placeholder="Search" className="py-1 px-2 h-8 rounded" value={search} onChange={(e) => onChangeSearch(e.target.value)} />
        </div>
    )
}