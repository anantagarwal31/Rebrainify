interface InputProps{
    placeholder: string,
    ref?:any
}

export function Input(props:(InputProps)){
    return <div>
        <input ref={props.ref} placeholder={props.placeholder} type="text" className="px-4 py-2 border border-gray-200 rounded m-2"></input>
    </div>
}