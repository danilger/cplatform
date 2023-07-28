import RoleGuard from "@/helpers/guards/role.guard"
import { Metadata } from "next"
//import styles from '../app/css/admin.module.css'

export const metadata: Metadata = {
    title: 'Админ панел',
    description: 'Панель администратора'
}

const Admin = async () => {
    const user = await RoleGuard('administrator')

    if (user) {
        return (
            <div className="container">
                <h1>Админ панель</h1>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium distinctio, dolores dolorem dicta minus maiores recusandae corrupti architecto voluptatem impedit ipsa nisi laborum et suscipit dolor placeat dolore, officia voluptate?
            </div>
        )
    }
}

export default Admin