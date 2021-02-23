import React, {useState} from "react";

type EditableSpanPropsType = {
    title: string
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)

    const ActivateEditMode = () => {
        setEditMode(true)
    }
    const ActivateViewMode = () => {
        setEditMode(true)
    }

    return editMode ?
        <input type="text" value={title} autoFocus/>
        : <span onDoubleClick={ActivateEditMode}>{props.title}</span>
}