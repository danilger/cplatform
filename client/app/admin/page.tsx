import { Metadata } from "next"
import RoleGuard from "../helpers/guards/role.guard"
import styles from '../css/admin.module.css'
import Posts from "../components/admin/posts"


export const metadata: Metadata = {
    title: 'Админ панел',
    description: 'Панель администратора'
}

const Admin = async () => {
    const user = await RoleGuard('administrator')

    if (user) {
        return (
            <div className="container">
                <h1>Панель администратора</h1>
                <div className={styles.panelWrapper}>
                    <div className={styles.menu + " shadow"}>
                        <div className={styles.button}>Записи</div>
                        <div className={styles.button}>Создать запись</div>
                    </div>
                    <div className={styles.panel + " shadow"}>
                        <Posts />
                    </div>
                </div>

            </div>
        )
    }
}

export default Admin