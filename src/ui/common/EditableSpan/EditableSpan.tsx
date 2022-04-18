import React, {ChangeEvent, useState} from 'react'

// import style from '../../profile/profile.module.css'

type EditableSpanPropsType = {
    titleName: string
    changeNameProfile: (name: string, avatar: string) => void
}

const EditableSpan = ({titleName, changeNameProfile,}: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(titleName)
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        changeNameProfile(title,'https://bipbap.ru/wp-content/uploads/2019/05/1528641301_4.jpg')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return editMode ? (
        <input
            onChange={onChangeHandler}
            autoFocus
            onBlur={offEditMode}
            value={title}
        />
    ) : (
        <span onDoubleClick={onEditMode} >
            {title}
        </span>
    )
}

// className={style.name}
export default EditableSpan
