import Input from '../../form/Input/Input'
import Select from '../../form/Select/Select'
import SubmitButton from '../../form/SubmitButton/SubmitButton'
import styles from './ProjectForme.module.css'

function ProjectForm({btnText}) {
    return (
        <form className={styles.form}>
            <Input 
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto"
            />
            <Input 
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento total"
            />
            <Select
                name="Category_id"
                text="Selecione a categoria"
            />
            <SubmitButton 
                text={btnText}
            />
        </form>
    )
}
export default ProjectForm