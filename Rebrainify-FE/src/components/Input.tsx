interface InputProps{
    placeholder: string,
    onChange: ()=>void
}

export function Input(props:(InputProps)){
    return <div>
        <input placeholder={props.placeholder} type="text" className="px-4 py-2 border border-gray-200 rounded m-2" onChange={props.onChange}></input>
    </div>
}