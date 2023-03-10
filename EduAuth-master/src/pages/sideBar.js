import SidebarItem from "../components/sidebarItem"
import items from "../sidebar.json"


export default function Sidebar(){
    return (
        <div className="sidebar">
            Filter Courses
            { items.map((item, index) => <SidebarItem key={index} item={item} />) }
        </div>
    )
}
