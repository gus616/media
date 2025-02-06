import { useRef } from "react";


type UserFormProps = {
    onSubmitHandler: (name: string, email: string, age: number) => void;
    onCancel: () => void;
}

const UserForm = ({ onSubmitHandler, onCancel }: UserFormProps) => {

    const userRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);

    const submitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!userRef.current?.value || !ageRef.current?.value || !emailRef.current?.value) return;

        onSubmitHandler(userRef.current!.value, emailRef.current!.value, +ageRef.current!.value);
    }
    return (
        <div>
            <h1 className="text-teal-500 text-2xl font-bold">Create User</h1>
            <form className="flex flex-col justify-between items-center" onSubmit={(e) => submitHandler(e)}>
                <input type="text" placeholder="Name" className="p-2 m-2 bg-teal-200 rounded-lg w-full" ref={userRef} />
                <input type="text" placeholder="Email" className="p-2 m-2 bg-teal-200 rounded-lg w-full" ref={emailRef} />
                <input type="number" placeholder="Age" className="p-2 m-2 bg-teal-200 rounded-lg w-full" ref={ageRef} />
                <div className="flex flex-row justify-around items-center w-full">
                    <button type="submit" className="p-2 m-2 bg-purple-400 rounded-lg w-20">Add</button>
                    <button type="button" className="p-2 m-2 bg-red-400 rounded-lg w-20" onClick={onCancel}>Cancel</button>
                </div>

            </form>
        </div>

    )
}

export default UserForm