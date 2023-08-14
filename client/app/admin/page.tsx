import { Metadata } from "next"
import RoleGuard from "../helpers/guards/role.guard"
import Panel from "../components/admin/panel"


export const metadata: Metadata = {
    title: 'Админ панел',
    description: 'Панель администратора'
}

const Admin = async () => {

    const user = await RoleGuard('administrator')

    if (user) {

        return (
            <Panel />
        )

    }
}

export default Admin